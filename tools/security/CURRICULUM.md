# BuildMyMTB Security Corpus — CURRICULUM

Read after [`INDEX.md`](INDEX.md); the corpus rules (citation discipline, append-only,
⚠ CONTRADICTION, severity ranking, the PROOF bar) apply at every level unchanged.

The bar, stated plainly: the corpus should eventually be **the type that would let a
competent application-security reviewer walk into this repo cold and audit it** — every
control named, every caller walked, every claim sourced. That is a multi-round program.
This file defines the levels so each training round knows what depth it is adding.

The mechanic corpus is graded by *mechanical* depth (foundation → World Cup wrench). This
one is graded by **the sophistication of the attacker it prepares you for.**

---

## The four levels

### L1 — Web fundamentals
General application-security literacy, tied to *our* shape: the OWASP Top 10 (both the 2021
edition the industry still speaks and the current 2025 one), XSS by output context, CSRF and
why a token-in-header SPA is differently exposed than a cookie-session app, injection,
transport, and CSP doctrine. Sources: OWASP (Top 10, Cheat Sheet Series), web.dev, MDN.
**This is the bootstrap seed + the first grind's target** — broad, correct, and grounded in
the code this repo actually ships (no build step, 69 `innerHTML` sites in `index.html`, a
vendored Supabase UMD, static hosting).

### L2 — Our-stack depth
Complete, vendor-primary coverage of the specific stack: **Supabase Postgres RLS** semantics
(USING vs WITH CHECK, permissive vs restrictive, per-operation policies, role targeting,
`auth.uid()`/`auth.jwt()` and their null behavior), PostgREST's exposed-schema and GRANT
layer *beneath* RLS, `SECURITY DEFINER` and `search_path` discipline, trigger-based
server-authoritative flags, Storage object policies, Supabase Auth's own rate limits and
production checklist, and GitHub Pages' / Cloudflare's actual header capabilities. L2 is
where "looks secure" becomes "here is the policy, the caller, and the request that proves
it." **`supabase-rls.md` is the chapter that must reach L2 first** — it is the one carrying
live user data today.

### L3 — Marketplace & payments
The domain-specific tier: money, identity, and goods. PCI-DSS scope and what must never be
stored; processor-mediated marketplace architectures (Connect-style) and why custody is the
decision that dominates all others; KYC and seller onboarding; chargeback and triangulation
mechanics; escrow's real tradeoffs; stolen-goods provenance and registry integration;
counterfeit detection where the failure mode is **physical injury**, not just fraud loss;
dispute adjudication that survives a bias audit. Mostly design-tier today (the marketplace is
off-live), so L3 facts are largely *architectural commitments to test later.*

### L4 — Adversarial craft
Practitioner judgment: thinking like the attacker rather than the checklist. Chained
exploits (a LOW info-leak plus a MEDIUM race becoming a HIGH), abuse economics (what does an
attack *cost* the attacker, and does our defense raise that cost or just annoy them), sybil
and collusion-ring detection, brigade dynamics and why report-count automation is
weaponizable, timing and enumeration side channels, and the discipline of **writing the
exploit** rather than describing the weakness. L4 is where the PROOF rule stops being
overhead and becomes the whole method. Expect L4 to lean more on labelled
practitioner/community tiers than L1–L2's vendor-primary sources, and to arrive last.

---

## Grading a chapter

Each chapter carries a **Maturity** line under its title:

- **foundation** — L1 coverage only.
- **professional** — L1 complete + meaningful L2 vendor-primary depth across most of the
  chapter's surface.
- **master** — L1 + L2 complete, plus L3 domain depth and (where applicable) L4 adversarial
  notes.

Grade **honestly**. A chapter with a handful of deep L2 facts and mostly L1 coverage is
`foundation`. Each chapter ends with a **## Gaps** section naming specifically what is
missing to reach the next level.

## Corpus rule: target the weakest chapter

Future training rounds read every chapter's Maturity + Gaps first and prioritize the
**weakest-graded** chapter(s), closing the listed gaps rather than re-covering ground.

**Standing exception — the load-bearing chapter outranks the weakest one.**
`supabase-rls.md` guards live user data *right now*; the marketplace does not exist yet. If
`supabase-rls.md` is below `professional`, it is the target regardless of what grades lower.
Depth follows exposure.

---

## A note on why this corpus grades differently from the mechanic's

A mechanic fact decays slowly — a Shimano freehub spline pattern is the same next year. A
security fact decays **fast and asymmetrically**: OWASP re-ranked its Top 10 in 2025,
Supabase renamed anon keys to publishable keys and is moving the Data API from opt-out to
opt-in exposure, and a policy that was safe becomes unsafe the day a new table lands in the
`public` schema beside it.

So every fact here carries its fetch date, and **a re-verification pass is itself legitimate
training work** — not a lesser activity than adding new facts. A stale security corpus that
*reads* current is precisely the "confident wrong answer" this project's whole discipline
exists to prevent.
