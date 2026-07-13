# Code-quality / efficiency audit — 2026-07-13

The recurring post-wave audit (creed: tidy · clean · efficient · unbreakable), run after the
2016→3018-part catalog growth, the C1–C4+M1 engine wave (`45f7331`) and the rider-profiles-v2 /
guides / theme-dropdown UI wave. Scope: `src/compat.js`, `src/schema.js`, `src/guides.js`,
`src/forum.js`, `src/account.js`, the `index.html` inline script, the test suite.
**Out of scope by design:** verdict-correctness vs the real world (the mechanic/dossier track).

Two fixes were applied on this branch (`audit/code-quality-2026-07-13`); everything else is
report-only. All four gates green after the fixes: `node validate.js` 0 problems ·
`npx vitest run` 477/477 · `npx tsc --noEmit` clean · `tools/verdict-audit-harness.js`
byte-identical to the pre-change baseline (only the pre-existing probe-E fork-family note).

---

## FIXED on this branch

### 1. HIGH — `byId` was a linear scan over all 3018 rows on every hot path
`src/compat.js` — `byId` walked `PARTS` front-to-back per call (~10 µs for a late id).
It sits under `resolveBuild`, `buildTotals`, `partWeight`, `partVerified`, `bundleActive`,
`sanitizeShare` and the whole UI render loop. **Fix:** memoized id→part index
(null-prototype object, so a crafted id like `__proto__` can never resolve to an inherited
value — same hardening posture as `sanitizeShare`), mirroring the existing `_PARTS_BY_CAT` /
`_CAT_SLOTS` memo idiom. Safe because the catalog is immutable at runtime (verified: nothing
in src/, tests or tools mutates `PARTS`). Measured: 10k late-id lookups 102.6 ms → 0.2 ms.

### 2. HIGH — `renderCatalog()` re-resolved the whole build once **per part** (per keystroke)
`index.html` — `compatFor(p)` called `resolved()` (one `byId` per filled slot) inside the
3018-row filter/map, and `groupCats(...)` was recomputed per part too. With a complete build
that was ~24 × 3018 id scans × 3018 rows ≈ hundreds of millions of compares **per render — and
the search box re-renders on every keystroke**. **Fix:** one `resolved()` + one group-cat list
per render, passed to `compatOf` directly.

**Measured (Node sim, full build, all-parts view):** 450 ms → 44 ms compute, identical
state distributions. **Measured live in the browser after both fixes:** search keystroke
9.2 ms; full 3018-card re-render incl. DOM 143 ms; a pick (full `sync()`) 199 ms; zero
console errors; dots render in all states.

---

## REPORT-ONLY (deliberately not changed)

### 3. MEDIUM — remaining render compute is baseline-recompute in `placementDiff`/`compatOf`
`src/compat.js:6394` / `:6411` — for every candidate part, `placementDiff` recomputes
`checkBuild(base)` where `base` is identical for all parts of the same category. A
render-scoped baseline cache (exactly what `_sampleSlotPick` already does in bulk at
`compat.js:6595`) would roughly halve the remaining ~44 ms. Not worth the API change at
current scale; revisit if the catalog grows several-fold or low-end-mobile profiling says so.

### 4. MEDIUM — O(n²) part lookups in `schema.js` catalog-level checks
`src/schema.js:693,701,710,720,727-729,796` — repeated `C.PARTS.filter(x => x.id === id)[0]`
full scans inside loops (groupset-system, bundledShock, oemOnly back-refs, bundle-price,
slot-has-parts, wheelset lints). `_ctx` already builds `ids`/`catOf` maps but no id→part map.
Harmless today (`node validate.js` = 0.23 s wall) — fix by extending `_ctx` with a part map
when the file is next touched, not as its own churn.

### 5. LOW — double `compatOf` per part when 🟢 Compatible-only is on
`index.html` `renderCatalog()` — the filter computes a part's state, then the meta map
computes it again. Post-fix cost is small (~2× of a now-cheap pass); folding them means
restructuring filter→map into one pass. Do it only if #3 is ever done.

### 6. LOW — inline-script vs src/ duplication (drift hazards, not bugs)
- `CAT_SLOTS` (index.html:1263) rebuilds what `_catSlots()` memoizes privately in compat.js —
  export one, delete the other next UI pass.
- `resolved()` / `_resolveData()` (index.html:1270, 2867) re-implement id→part resolution that
  `resolveBuild()` (compat.js) already does for string builds (with the added throw-on-unknown
  guard). Consolidation candidate, needs care around the unknown-id behavior difference.
- **`isPreset` exists twice with different semantics**: index.html:1269 (`!!p.fills`) vs
  schema.js:411 (`cat` ∈ PRESET_CATS). Same name, different predicate — rename one when touched.
- `cardEl`'s `compat = compat || compatFor(p)` fallback is dead (single call site always
  passes `compat`) — harmless defensive guard, left in place.

### 7. LOW — doc/comment drift
- `CLAUDE.md`'s test-file table omits `test/test-invariants.js` (mentioned in prose only).
- Live-count comments in compat.js ("51 SHIS-carrying frames", "10 catalog frames") carry
  as-of dates so they age honestly — keep the as-of convention for future counts.
- Fixed in passing: a doubled `// @ts-ignore` above `PARTS_RAW` (the first targeted a comment
  line and was inert).

### 8. FLAG for Douglas via coordinator — forum `emtb` category
`src/forum.js:52` ships an "⚡ E-MTB" **discussion** category. Hard rule 1 is catalog-scoped
(no e-bike *parts*), so this is not a violation, but given how emphatic the rule is it
deserves an explicit "yes, discussion is fine" from Douglas rather than an assumption.

### 9. Fragility checks that came back CLEAN
- No `PARTS` mutation anywhere (makes the `byId`/`_PARTS_BY_CAT` memos safe).
- `LABELS` (127 keys): no duplicate keys.
- Recent vocab/cross-rule additions all have negative tests: `forkTravelHard` source/min
  cross-rule, headset S.H.I.S. steerer-suffix cross-rules, `hybrid` pedal style, ZS49/EC49
  headTube values. `XDR` has no dedicated negative test but is covered generically by rule 6's
  exact-equality (any XDR wheel vs any current cassette errors, as documented in the vocab note).
- No stray root test files (`test_compat.js` / `test2.js` gone).
- `src/guides.js`, `src/forum.js`, `src/account.js`: tidy; pure data / thin async data-access,
  consistent probe-and-cache feature-detection idiom, no dead code found.
