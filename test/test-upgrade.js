'use strict';
/* The Upgrade Advisor's pure logic (src/upgrade.js): the swap-aware
   upgradeCheck() behind the "will this part fit MY bike" flow, and the
   #upgrade hash codec that makes an upgrade check shareable (NAV-15/16).

   The two contracts that matter most:
   1. SWAP, not add — a candidate is judged as the build WITH it swapped in
      (the tested slot + mutex partners cleared first), so the part it
      replaces can neither hide a new conflict (the REVIEW.md #4/#13
      byte-identical-verdict masking) nor leak its own conflicts onto the
      candidate.
   2. The state can NEVER disagree with compatOf's dot — the card and the
      detail block must be the same verdict (pinned property-style over a
      catalog sample below). */
var U = require('../test/test-util.js');
var C = U.C, B = U.B, part = U.part, eq = U.eq, ok = U.ok, some = U.some;
var UP = require('../src/upgrade.js');

var DEPS = { checkBuild: C.checkBuild, verdictKey: C.verdictKey, byId: C.byId,
             SLOTS: C.SLOTS, altSlotsOf: C.altSlotsOf };

/** Narrow a nullable UpgradeVerdict — a null where a verdict is expected is a
 * test failure, same convention as test-util's part().
 * @param {import('../src/upgrade.js').UpgradeVerdict|null} uc
 * @returns {import('../src/upgrade.js').UpgradeVerdict} */
function must(uc){
  if(!uc) throw new Error('expected an UpgradeVerdict, got null');
  return uc;
}

/* The pinned mid-range golden (same ids as index.html's SAMPLE_FALLBACK.mid,
   which test-golden.js keeps compatible) — a real, conflict-free baseline. */
var MID = { frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170',
  shock:'sh-rockshox-super-deluxe-ultimate-230x62p5', frontWheel:'fw-reserve-30-hd-29',
  rearWheel:'rw-reserve-30-hd-29', frontTire:'ti-maxxis-assegai-29-25-exop-mg',
  rearTire:'ti-maxxis-assegai-29-25-exop-mg', shifter:'sft-sram-gx-eagle',
  derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle',
  crankset:'cr-sram-gx-eagle', frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc',
  frontRotor:'ro-sram-hs2-200-6b', rearRotor:'ro-sram-hs2-200-6b',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon',
  dropper:'dp-oneup-v3-316-210', saddle:'sa-wtb-volt', pedals:'pd-oneup-aluminum' };

test('upgradeCheck: empty baseline is grey (nothing to judge)', function(){
  var uc = must(UP.upgradeCheck(part('fk-rockshox-zeb-ultimate-29-170'), B({}), DEPS));
  eq(uc.state, 'n');
  eq(uc.slotKey, null);
});

test('upgradeCheck: a compatible swap on a clean build is green, names its slot, and lists the displaced part', function(){
  var bld = B(Object.assign({}, MID, { fork: 'fk-rockshox-zeb-ultimate-275-170' }));
  ok(C.checkBuild(bld).errors.length > 0, 'baseline must start with the 27.5-fork conflict');
  var uc = must(UP.upgradeCheck(part('fk-rockshox-zeb-ultimate-29-170'), bld, DEPS));
  eq(uc.state, 'g', 'the old fork\'s conflict must not leak onto the candidate');
  eq(uc.slotKey, 'fork');
  eq(uc.displaced.length, 1);
  eq(uc.displaced[0].id, 'fk-rockshox-zeb-ultimate-275-170');
  eq(uc.newErrors.length, 0);
});

test('upgradeCheck: the swap reports which CURRENT conflicts it clears (resolves)', function(){
  var bld = B(Object.assign({}, MID, { fork: 'fk-rockshox-zeb-ultimate-275-170' }));
  var uc = must(UP.upgradeCheck(part('fk-rockshox-zeb-ultimate-29-170'), bld, DEPS));
  ok(uc.resolvesErrors.length >= 1, 'swapping the good fork in must clear the wheel-size error');
  some(uc.resolvesErrors, 'wheel size mismatch');
});

test('upgradeCheck: an incompatible candidate is red with the new error attached', function(){
  var bld = B(MID);
  var uc = must(UP.upgradeCheck(part('fk-rockshox-zeb-ultimate-275-170'), bld, DEPS));
  eq(uc.state, 'r');
  ok(uc.newErrors.length >= 1);
  some(uc.newErrors, 'wheel size mismatch');
  eq(uc.resolvesErrors.length, 0, 'a clean baseline has nothing to resolve');
});

test('upgradeCheck: masking guard — a candidate raising a byte-identical warning to the part it replaces still shows yellow (swap semantics, REVIEW.md #4/#13)', function(){
  // Baseline dropper is 30.9 in a 31.6 seat tube -> shim warning. The candidate
  // 30.9 dropper raises the IDENTICAL verdict (same ruleId+slots+msg). An
  // add-style diff against the uncleared build would call it "not new" ->
  // false green; the swap-cleared diff must surface it as yellow.
  var bld = B(Object.assign({}, MID, { dropper: 'dp-pnw-loam-309-175' }));
  ok(C.checkBuild(bld).warnings.length > 0, 'baseline must start with the shim warning');
  var uc = must(UP.upgradeCheck(part('dp-fox-transfer-factory-309-180'), bld, DEPS));
  eq(uc.state, 'w');
  some(uc.newWarnings, 'shim');
});

test('upgradeCheck: re-picking the part already in the slot displaces nothing', function(){
  var uc = must(UP.upgradeCheck(part('fk-rockshox-zeb-ultimate-29-170'), B(MID), DEPS));
  eq(uc.state, 'g');
  eq(uc.displaced.length, 0);
});

test('upgradeCheck: preset kits diff all their fills and list only genuinely displaced parts', function(){
  // The mid baseline already runs the GX Eagle groupset's exact fills — the
  // kit displaces nothing. A different drivetrain baseline displaces its parts.
  var same = must(UP.upgradeCheck(part('gs-sram-gx-eagle'), B(MID), DEPS));
  ok(same !== null);
  eq(same.slotKey, null, 'a kit fills several slots — no single placement');
  eq(same.displaced.length, 0);
  var xx = B(Object.assign({}, MID, { shifter:'sft-sram-xx-sl-transmission',
    derailleur:'dr-sram-xx-transmission', cassette:'ca-sram-xs1299',
    chain:'ch-sram-gx-flattop', crankset:'cr-sram-xx-sl-transmission' }));
  var swap = must(UP.upgradeCheck(part('gs-sram-gx-eagle'), xx, DEPS));
  ok(swap.displaced.length >= 4, 'swapping drivetrains displaces the current drivetrain parts');
});

test('upgradeCheck: state and reason can never disagree with compatOf\'s dot (catalog sample x 3 baselines)', function(){
  var builds = [
    B(MID),
    B(Object.assign({}, MID, { fork: 'fk-rockshox-zeb-ultimate-275-170' })),   // has an error
    B({ frame: MID.frame, fork: MID.fork })                                    // partial build
  ];
  var checked = 0;
  for(var i = 0; i < C.PARTS.length; i += 25){
    var p = C.PARTS[i];
    var isPreset = 'fills' in p && !!p.fills;
    if(!isPreset && UP.upgradeSlotsFor(p.cat, C.SLOTS).length === 0) continue;   // not a candidate (completebike handled via fills)
    for(var b = 0; b < builds.length; b++){
      var dot = C.compatOf(p, builds[b]);
      var uc = must(UP.upgradeCheck(p, builds[b], DEPS));
      ok(uc !== null, 'upgradeCheck must judge ' + p.id);
      eq(uc.state, dot.state, p.id + ' (build ' + b + '): detail state must match the dot');
      eq(uc.reason, dot.reason, p.id + ' (build ' + b + '): detail reason must match the dot');
      checked++;
    }
  }
  ok(checked > 100, 'the sample must actually cover the catalog (checked ' + checked + ')');
});

test('upgradeCheck: green reason keeps the honesty disclosure verbatim', function(){
  var uc = must(UP.upgradeCheck(part('fk-rockshox-zeb-ultimate-29-170'), B(MID), DEPS));
  eq(uc.reason, UP.UPGRADE_GREEN_REASON);
  ok(UP.UPGRADE_GREEN_REASON.indexOf('among the dimensions we check') >= 0,
     'the non-overclaim wording must survive any future edit');
});

/* ---- #upgrade hash codec ------------------------------------------------- */

test('parseUpgradeHash: non-upgrade hashes are not ours', function(){
  eq(UP.parseUpgradeHash(null), null);
  eq(UP.parseUpgradeHash(''), null);
  eq(UP.parseUpgradeHash('#b=abc'), null);
  eq(UP.parseUpgradeHash('#guides'), null);
  eq(UP.parseUpgradeHash('#upgradeish'), null);
});

/** Narrow a nullable parse/decode result, same convention as must().
 * @template T @param {T|null} v @returns {T} */
function got(v){
  if(v === null || v === undefined) throw new Error('expected a value, got ' + v);
  return v;
}

test('parseUpgradeHash: mode-on shapes', function(){
  eq(got(UP.parseUpgradeHash('#upgrade')).kind, 'pick');
  eq(got(UP.parseUpgradeHash('#upgrade/')).kind, 'pick');
  eq(got(UP.parseUpgradeHash('#upgrade/garbage')).kind, 'pick', 'unknown sub-shape degrades to the picker');
  eq(got(UP.parseUpgradeHash('#upgrade/bike/%')).kind, 'pick', 'undecodable id degrades to the picker');
});

test('hash round-trip: pristine complete-bike baseline', function(){
  var h = UP.upgradeHashOf({ kind: 'bike', id: 'cb-santacruz-hightower-r-2025' });
  var r = got(UP.parseUpgradeHash(h));
  if(r.kind !== 'bike') throw new Error('expected a bike route, got ' + r.kind);
  eq(r.id, 'cb-santacruz-hightower-r-2025');
});

test('hash round-trip: arbitrary build baseline through the share-payload grammar', function(){
  var h = UP.upgradeHashOf({ kind: 'build', b: MID, p: { drivetrain: 'gs-sram-gx-eagle' } });
  var r = got(UP.parseUpgradeHash(h));
  if(r.kind !== 'build') throw new Error('expected a build route, got ' + r.kind);
  var dec = got(UP.decodeBuildPayload(r.payload, C.sanitizeShare));
  eq(Object.keys(dec.build).length, Object.keys(MID).length);
  eq(dec.build.frame, MID.frame);
  eq(dec.presetBy.drivetrain, 'gs-sram-gx-eagle');
});

test('decodeBuildPayload: accepts a full pasted share link and rejects garbage', function(){
  var payload = UP.encodeBuildPayload({ frame: MID.frame }, {});
  var dec = got(UP.decodeBuildPayload('https://buildmymtb.com/#b=' + payload, C.sanitizeShare));
  eq(dec.build.frame, MID.frame);
  eq(UP.decodeBuildPayload('no payload here', C.sanitizeShare), null);
  eq(UP.decodeBuildPayload('#b=%%%not-base64%%%', C.sanitizeShare), null);
  eq(UP.decodeBuildPayload('#b=' + UP.encodeBuildPayload({}, {}), C.sanitizeShare), null, 'an empty build is nothing to load');
});

test('decodeBuildPayload: crafted links go through sanitizeShare (foreign slot injection dropped)', function(){
  var payload = UP.encodeBuildPayload({ fork: 'ti-maxxis-assegai-29-25-exop-mg', frame: MID.frame }, {});
  var dec = got(UP.decodeBuildPayload('#b=' + payload, C.sanitizeShare));
  eq(dec.build.fork, undefined, 'a tire id in the fork slot must be dropped');
  eq(dec.build.frame, MID.frame);
});

test('resolveUpgradeBike: canonical complete bikes only', function(){
  var deps = { byId: C.byId, canonicalId: C.canonicalId };
  var p = UP.resolveUpgradeBike('cb-santacruz-hightower-r-2025', deps);
  ok(p && p.cat === 'completebike');
  eq(UP.resolveUpgradeBike('fk-rockshox-zeb-ultimate-29-170', deps), null, 'a non-bike id is rejected');
  eq(UP.resolveUpgradeBike('cb-no-such-bike', deps), null);
  eq(UP.resolveUpgradeBike(null, deps), null);
});

test('upgradePartnersOf: wheel alternates and the seatpost mutex are cleared like setSlot would', function(){
  ok(UP.upgradePartnersOf('frontWheel', DEPS).length >= 1, 'a complete wheel clears its hub/rim alternates');
  ok(UP.upgradePartnersOf('dropper', DEPS).indexOf('seatpost') >= 0, 'dropper clears the rigid post');
  ok(UP.upgradePartnersOf('seatpost', DEPS).indexOf('dropper') >= 0, 'and vice versa');
  eq(UP.upgradePartnersOf('no-such-slot', DEPS).length, 0);
});
