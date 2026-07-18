# Web Fundamentals — Security Corpus

**Maturity: foundation** (L1 coverage — see [`CURRICULUM.md`](CURRICULUM.md)). Seeded
2026-07-18 from fetched OWASP (Top 10 2021 + 2025, XSS Prevention Cheat Sheet) and web.dev
(Strict CSP), grounded against this repo's actual shape. No L2 depth yet on Trusted Types,
subresource integrity, or the Cloudflare header path — see `## Gaps`.

OWASP Top 10 · XSS by output context · CSRF · injection · CSP doctrine for a static site.
Read [`INDEX.md`](INDEX.md) first (corpus rules, the severity scale, the PROOF bar).

Fact IDs are stable and append-only (`WEB-n`). Confidence is the source's own grading.

---

## The OWASP Top 10 — both editions

**WEB-1 — The current OWASP Top 10 release is the 2025 edition, not 2021.** OWASP's project
page states plainly that the most current released version is the 2025 Top Ten; the 2021
edition is archived. *Confidence: confirmed.* Source: `owasp.org/www-project-top-ten/`
(fetched 2026-07-18).

**Why this fact leads the chapter:** a security answer that cites "OWASP Top 10" while
listing the 2021 categories is subtly stale, and staleness is the exact failure mode
[`CURRICULUM.md`](CURRICULUM.md) warns about. **Cite the edition explicitly, always.** Both
are recorded below because the 2021 numbering is still what most tooling, compliance
questionnaires, and engineers say out loud.

**WEB-2 — OWASP Top 10:2025 categories (verbatim).** *Confidence: confirmed.* Source:
`owasp.org/Top10/2025/` (fetched 2026-07-18).

| # | Category |
|---|---|
| A01:2025 | Broken Access Control |
| A02:2025 | Security Misconfiguration |
| A03:2025 | Software Supply Chain Failures |
| A04:2025 | Cryptographic Failures |
| A05:2025 | Injection |
| A06:2025 | Insecure Design |
| A07:2025 | Authentication Failures |
| A08:2025 | Software or Data Integrity Failures |
| A09:2025 | Security Logging and Alerting Failures |
| A10:2025 | Mishandling of Exceptional Conditions |

**WEB-3 — OWASP Top 10:2021 categories (verbatim).** *Confidence: confirmed.* Source:
`owasp.org/Top10/2021/` (fetched 2026-07-18).

| # | Category |
|---|---|
| A01:2021 | Broken Access Control |
| A02:2021 | Cryptographic Failures |
| A03:2021 | Injection |
| A04:2021 | Insecure Design |
| A05:2021 | Security Misconfiguration |
| A06:2021 | Vulnerable and Outdated Components |
| A07:2021 | Identification and Authentication Failures |
| A08:2021 | Software and Data Integrity Failures |
| A09:2021 | Security Logging and Monitoring Failures |
| A10:2021 | Server Side Request Forgery (SSRF) |

**WEB-4 — What moved between the editions, and what it means for us.** *Confidence: partial
— the ordering and naming deltas are confirmed from the two fetched category lists (WEB-2,
WEB-3); the interpretation of WHY is labelled inference, since the fetched pages did not
include OWASP's methodology narrative.*

Confirmed deltas:
- **Broken Access Control stays A01** in both editions.
- **Security Misconfiguration rose 2021-A05 → 2025-A02.**
- **Software Supply Chain Failures (2025-A03) is new**, and appears to absorb/broaden
  2021-A06 "Vulnerable and Outdated Components," which no longer appears under that name.
- **Injection fell 2021-A03 → 2025-A05**; **Cryptographic Failures** fell A02 → A04.
- **SSRF (2021-A10) no longer appears as its own category.**
- **Mishandling of Exceptional Conditions (2025-A10) is new.**
- **Logging** was renamed *Monitoring* → *Alerting*; **Authentication Failures** dropped the
  "Identification and" prefix.

*Inference (labelled):* the three categories that outrank Injection in 2025 — access control,
misconfiguration, supply chain — are precisely the three that dominate **this** application's
risk. We have almost no server-side code to inject into; we have a database whose entire
safety rests on access-control policy (see [`supabase-rls.md`](supabase-rls.md)), a
misconfiguration surface that is one forgotten `enable row level security` wide, and a
vendored third-party dependency in `src/vendor/supabase.min.js`. **The 2025 re-ranking maps
onto our threat model better than the 2021 one did.** Do not treat this paragraph as OWASP's
reasoning; it is ours.

**WEB-5 — Our top-3 by the 2025 list, with the concrete local surface.** *Confidence:
inference from WEB-2 + repo inspection (fetched/read 2026-07-18).*
- **A01 Broken Access Control** → every `create policy` in `supabase/*.sql`. This is where a
  real breach would come from. Covered in [`supabase-rls.md`](supabase-rls.md).
- **A02 Security Misconfiguration** → a table shipped without RLS, a bucket left public, an
  over-broad GRANT, a missing CSP. See WEB-14 and `RLS-2`.
- **A03 Software Supply Chain Failures** → `src/vendor/supabase.min.js` is a committed
  third-party UMD bundle. See WEB-19.

---

## XSS — the chapter's live surface

**WEB-6 — Encode by OUTPUT CONTEXT, not by input.** HTML body, HTML attribute, JavaScript,
CSS and URL contexts each require a *different* encoding; one global "sanitize on input" pass
cannot be correct for all of them. *Confidence: confirmed.* Source: OWASP XSS Prevention
Cheat Sheet (fetched 2026-07-18).

**WEB-7 — HTML-body context requires exactly these five encodings:** `&`→`&amp;`,
`<`→`&lt;`, `>`→`&gt;`, `"`→`&quot;`, `'`→`&#x27;`. *Confidence: confirmed.* Source: OWASP
XSS Prevention Cheat Sheet (fetched 2026-07-18).

**WEB-8 — This repo's `esc()` implements WEB-7 correctly and completely.**
`src/compat.js:21231` replaces `&` first, then `<`, `>`, `"`, `'` (as `&#39;`, the decimal
equivalent of OWASP's `&#x27;`), and coerces null/undefined to `''`. **Ampersand-first
ordering is required** — encoding it last would double-encode the entities produced by the
earlier replacements. *Confidence: confirmed (read 2026-07-18 + OWASP cheat sheet).*
**This is a defense that HOLDS**, recorded per INDEX rule 8's corollary. `test/test-ui.js`
pins `esc()`'s behavior, so a regression here fails the suite.

**WEB-9 — Unsafe sinks vs safe sinks.** Unsafe (parse their input as markup):
`.innerHTML`, `.outerHTML`, `.insertAdjacentHTML()`, `document.write()`, `script.src`.
Safe (treat input as text): `.textContent`, `.insertAdjacentText()`, `.createTextNode()`,
`.className`, `.value`, and `.setAttribute()` **when the attribute name is hardcoded and
safe**. *Confidence: confirmed.* Source: OWASP XSS Prevention Cheat Sheet (fetched
2026-07-18).

**WEB-10 — `innerHTML` is this app's dominant rendering mechanism, so `esc()` discipline is
load-bearing, not incidental.** `index.html` contains **69** `innerHTML` assignments and
`bmx.html` **8** (counted 2026-07-18). The app has no framework auto-escaping — it is plain
browser JS by convention (`CLAUDE.md` → Conventions), so **there is no second line of defense
behind `esc()` in the HTML-body context.** Every interpolation of catalog text, user text, or
URL-derived text into an `innerHTML` template must pass through `esc()`.
*Confidence: confirmed (repo count + CLAUDE.md).*

> **Review heuristic (INFO, not a finding):** the highest-value XSS review in this repo is
> mechanical — enumerate the `innerHTML` template literals and check each `${...}` for an
> `esc()` wrapper. Catalog text is author-controlled and low-risk; **forum bodies, profile
> fields, review titles/bodies, and anything read out of `location.hash` are attacker-
> controlled and are where a real finding would live.** A full sweep has NOT been run — this
> is a named gap, not a clean bill of health.

**WEB-11 — `setAttribute()` is only safe with a hardcoded attribute name; event-handler
attributes (`onclick`, `onerror`, …) are never safe sinks.** A dynamic attribute *name* lets
an attacker choose `onerror`, which no value-encoding defends. *Confidence: confirmed.*
Source: OWASP XSS Prevention Cheat Sheet (fetched 2026-07-18).

**WEB-12 — URLs in `href`/`src` need URL-encode THEN attribute-encode, and the scheme must
be allowlisted.** OWASP names `attributeEncode(urlencode(parameter))` as the correct order
and calls the reversed/omitted form "the common mistake." Separately, **`javascript:` and
`data:` URLs execute code**, so encoding alone is insufficient — the scheme must be validated
against an allowlist. *Confidence: confirmed.* Source: OWASP XSS Prevention Cheat Sheet
(fetched 2026-07-18).

⚠ **Directly relevant to staged work.** `supabase/reviews.sql` stores a user-supplied
`video_url`, and the marketplace design contemplates user-supplied listing URLs. The DB
CHECK constraint anchors the host (see `RLS-24`), which is the right first layer — but
**WEB-12 says the renderer must independently validate the scheme before it reaches an
`href`/`src`/iframe**, because a DB constraint added later or relaxed once stops protecting
older rows. Defense belongs at the sink too.

**WEB-13 — DOM-based XSS is invisible to server-side and WAF filtering.** The payload can
live in the fragment (`location.hash`), which **is never sent to the server**, so no proxy,
WAF, or server log can see or filter it. *Confidence: confirmed.* Source: OWASP XSS
Prevention Cheat Sheet (fetched 2026-07-18).

**Local relevance — this is our #1 structural XSS shape.** BuildMyMTB is a static site whose
**share-links are entirely fragment-based** (`readHash()` / `sanitizeShare()` in
`src/compat.js`). A crafted share link is attacker-controlled input that reaches the app with
zero server involvement. The existing `sanitizeShare()` is an *allowlist* — it drops slot ids
and part ids that are not in the catalog (`test/test-share.js` pins this) — which is the
strongest possible shape for this defense: **the hash can only ever select from known-good
values, never introduce new strings.** *This defense HOLDS* and it holds for the right
structural reason, not by escaping luck.

---

## CSP for a static, no-build-step, GitHub-Pages site

**WEB-14 — This site currently ships NO Content-Security-Policy.** No `Content-Security-Policy`
header is configured in `.github/workflows/deploy.yml` and no `<meta http-equiv>` CSP appears
in `index.html` or `bmx.html` (grepped 2026-07-18). *Confidence: confirmed.*
**Severity: LOW as a standalone finding**, because CSP is defense-in-depth (WEB-18), not a
primary control — but it is the single cheapest hardening available and it maps to
**A02:2025 Security Misconfiguration**.

**WEB-15 — Allowlist-based CSP is not worth building; strict CSP is the target.** web.dev is
explicit that host-allowlist policies "can be bypassed in most configurations" and demand
heavy per-site customization. *Confidence: confirmed.* Source:
`web.dev/articles/strict-csp` (fetched 2026-07-18).

**WEB-16 — For a fully static site, HASH-based strict CSP is the mandated form; nonces are
structurally unavailable.** A nonce must be freshly generated per response and only mitigates
XSS if the attacker cannot guess it — which requires server-side rendering. A static host
serving a cacheable file cannot do that. The hash form is:

```
Content-Security-Policy:
  script-src 'sha256-{HASH_OF_INLINE_SCRIPT}' 'strict-dynamic';
  object-src 'none';
  base-uri 'none';
```

*Confidence: confirmed.* Source: `web.dev/articles/strict-csp` (fetched 2026-07-18).

**WEB-17 — `object-src 'none'` and `base-uri 'none'` are non-negotiable companions.**
`object-src 'none'` disables plugin execution; `base-uri 'none'` blocks an injected `<base>`
tag from redirecting every relative script URL. *Confidence: confirmed.* Source:
`web.dev/articles/strict-csp` (fetched 2026-07-18).

**These two are the cheapest real win available to this repo.** They constrain nothing this
app does (no plugins, no `<base>` tag), require no hashing, and survive a `<meta>`-tag
deployment. A CSP consisting of *only* those two directives would be a strict improvement
over WEB-14's nothing, at effectively zero risk of breaking the site.

**WEB-18 — CSP is defense-in-depth ONLY, never a primary XSS control.** OWASP states this
directly: CSP "doesn't address the root XSS vulnerability," browser-version inconsistencies
leave gaps, and it is not effective against DOM-based XSS. *Confidence: confirmed.* Source:
OWASP XSS Prevention Cheat Sheet (fetched 2026-07-18).

**Consequence for us: `esc()` (WEB-8) and `sanitizeShare()` (WEB-13) are the real defenses;
a future CSP is a seatbelt.** Never let a CSP proposal be used to justify relaxing either —
and note WEB-18's DOM-XSS caveat lands squarely on our fragment-based architecture.

**WEB-19 — Deployment path is `Content-Security-Policy-Report-Only` first, then enforce.**
web.dev's sequence: choose the form, test locally, deploy report-only, monitor violations,
switch to enforcement, verify with CSP Evaluator or Lighthouse. *Confidence: confirmed.*
Source: `web.dev/articles/strict-csp` (fetched 2026-07-18).

**WEB-20 — OPEN QUESTION (unestablished): which header mechanism this deployment can
actually use.** The app is served from **GitHub Pages** (`.github/workflows/deploy.yml`) but
sits behind **Cloudflare** (custom domain `buildmymtb.com`, Cloudflare Web Analytics beacon
live). That implies two candidate paths — a `<meta http-equiv="Content-Security-Policy">` tag
committed into the HTML, or a Cloudflare response-header Transform Rule — with meaningfully
different capabilities (notably, `frame-ancestors` and reporting directives are **ignored** in
`<meta>` form, per general CSP behavior). **Neither GitHub Pages' custom-header capability nor
the Cloudflare configuration was fetched or verified this round.** Per corpus rule 6 and the
PROOF bar, this is filed as a **question, not a recommendation** — no CSP should be proposed
until the delivery mechanism is confirmed against a fetched primary source.

**WEB-21 — Trusted Types is the strongest available DOM-XSS control and is directly
applicable here.** `Content-Security-Policy: require-trusted-types-for 'script'` makes DOM
XSS sinks reject plain strings on Chromium browsers, eliminating whole classes of the bug
when paired with a sanitizer policy. *Confidence: confirmed.* Source: OWASP XSS Prevention
Cheat Sheet (fetched 2026-07-18).

**Local note (inference):** given WEB-10's 69 `innerHTML` sites, Trusted Types would be a
*large* migration, not a header flip — every one of those sinks would need a policy-produced
value. Recorded as a genuine long-term target, explicitly **not** a near-term
recommendation.

---

## CSRF and the token-in-header shape

**WEB-22 — This app's Supabase calls are not classically CSRF-exposed, because the credential
is not an ambient cookie.** Supabase's JS client sends the session as an `Authorization:
Bearer` header, which a cross-origin form post or image tag **cannot cause the browser to
attach** — unlike a session cookie, which the browser sends automatically on cross-site
requests. That is the structural reason CSRF tokens are not needed here.
*Confidence: partial.* Grounded in the Supabase RLS docs' description of request-role mapping
by JWT (fetched 2026-07-18); **the specific claim that the vendored client uses header-based
auth exclusively (rather than any cookie fallback) was NOT verified against a fetched
Supabase auth-storage doc this round.** Filed at `partial` deliberately — do not upgrade it
without fetching that page.

**WEB-23 — The corresponding exposure is token THEFT, not token riding.** Because the session
lives in JS-reachable storage rather than an `HttpOnly` cookie, **any successful XSS is a
full account compromise** — the attacker reads the token and replays it against the API as
the user. *Confidence: inference from WEB-22 + WEB-9.*

**This is the fact that makes WEB-10 serious.** In a cookie-session app, XSS is bad. In this
architecture, XSS *is* authentication bypass: every RLS policy in
[`supabase-rls.md`](supabase-rls.md) is perfectly enforced and perfectly irrelevant, because
the attacker is authenticated **as the victim**. The RLS layer and the XSS layer are not
independent defenses — **XSS defeats RLS entirely.** Rank `innerHTML` findings on
attacker-controlled text accordingly: they are not "just XSS."

---

## Injection, beyond SQL

**WEB-24 — We have essentially no classic SQL-injection surface, and that is architectural.**
The client never composes SQL; it calls PostgREST through the vendored client, which
parameterizes. The SQL in `supabase/*.sql` is author-written DDL run once by the owner, not
built from user input. *Confidence: inference from repo structure (read 2026-07-18).*

**WEB-25 — The residual injection surface is `SECURITY DEFINER` functions and their
`search_path`.** Supabase's own hardening guidance states that **RLS does not apply to
functions** and that every `SECURITY DEFINER` function warrants careful review. *Confidence:
confirmed.* Source: Supabase "Hardening the Data API" (fetched 2026-07-18). Detail and this
repo's handling in [`supabase-rls.md`](supabase-rls.md) (`RLS-12`, `RLS-13`).

---

## Gaps

Honest list of what this chapter needs to reach `professional` (L2):

- **No sweep of the 69 `innerHTML` sites has been performed.** WEB-10 records the count and
  the method; it does not record a result. Until that sweep runs against the
  attacker-controlled surfaces (forum bodies, profile fields, review text, hash-derived
  values), this chapter cannot claim the XSS posture is clean — and nobody should say it is.
- **WEB-20 is unresolved** — GitHub Pages custom-header support and the live Cloudflare
  header configuration both need fetching before any CSP recommendation is made.
- **No Subresource Integrity / supply-chain fact for `src/vendor/supabase.min.js`.** A01/A03
  of the 2025 list points straight at it: no recorded hash, no recorded upstream-verification
  procedure, no stated update policy. This is the biggest *named but unexamined* surface in
  the corpus. **L2 gap, and arguably the next round's target.**
- **WEB-22 is at `partial`** pending a fetched Supabase auth session-storage doc.
- **No OWASP per-category detail pages fetched** — only the category lists (WEB-2, WEB-3).
  The 2025 methodology narrative and per-category CWE mappings are unread, which is why
  WEB-4's "why" is labelled inference.
- **No coverage of:** clickjacking / `frame-ancestors`, HSTS and transport headers,
  `Referrer-Policy` (relevant to the affiliate-link `rel=sponsored` outbound path),
  `window.opener` / `noopener` on outbound retailer links, or Trusted Types migration
  mechanics beyond WEB-21.
- **No L3/L4 content at all** — no chained-exploit reasoning, no abuse-economics framing.
