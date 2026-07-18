# Abuse & Moderation — Security Corpus

**Maturity: foundation** (L1 coverage — see [`CURRICULUM.md`](CURRICULUM.md)). Seeded
2026-07-18 from the fetched Supabase Going-into-Prod rate-limit table, this repo's shipped
forum/reviews policies, and Douglas's recorded moderation doctrine. No L2 depth on
application-layer rate limiting, Cloudflare's capabilities, or sybil detection — see `## Gaps`.

Rate limiting · brigade resistance · sybil and astroturf · the free-speech line.
Read [`INDEX.md`](INDEX.md) first.

Fact IDs are stable and append-only (`ABU-n`).

---

## The doctrine this chapter serves

**ABU-1 — FREE SPEECH FIRST: guard mechanical abuse only, never viewpoint.** Douglas's
standing directive: users "speak very very very freely." Moderation targets **mechanical
abuse** — flooding, spam, scam links, illegal content, doxxing — and **never** viewpoint,
opinion, or profanity. *Confidence: confirmed.* Source: `MEMORY.md`
[[forum-automod-philosophy]], recorded 2026-07-11; echoed in
`data/MARKETPLACE-SECURITY-MODEL.md` §4.8.

**This is a product constraint that SHAPES the security design, and it is not a limitation.**
It forces every anti-abuse control to be **content-neutral** — measured in rate, volume,
structure and provenance rather than meaning. Content-neutral controls happen to be the more
robust kind: they cannot be argued with, they do not need a classifier, they do not drift, and
they apply identically to speech the operator likes and speech he does not. **Every control in
this chapter must be expressible without reference to what a post says.**

**ABU-2 — NO AUTO-HIDE ON REPORT COUNT. Reports feed a HUMAN queue, always.** Nothing hides
content on an accumulated report count. This is explicit anti-brigade design. *Confidence:
confirmed.* Sources: `MEMORY.md` [[forum-automod-philosophy]]; `supabase/reviews.sql`, which
implements it and says so in-file — reports "only accumulate for an admin to read; hiding is
a manual admin action" (read 2026-07-18).

**The threat this defeats, stated concretely:** auto-hide converts *report volume* into
*censorship power*, and report volume is the single easiest thing on any platform to
manufacture. With auto-hide at threshold N, silencing any user costs an attacker exactly N
sockpuppet accounts — a bounded, purchasable price. **Without it, that attack has no
mechanism at all.** The defense is not a mitigation; it is a structural removal of the attack
surface, and it is the strongest single anti-abuse decision in the schema.

**ABU-3 — The report queue is admin-only readable, so reporting cannot be weaponized to
expose reporters.** `review_reports` has an insert policy for the reporter and **admin-only**
select; reasons and reporter ids are never world-readable. *Confidence: confirmed.* Source:
`supabase/reviews.sql` (read 2026-07-18).

**Correct and non-obvious.** A world-readable report queue enables retaliation against
good-faith reporters, which suppresses reporting exactly when it matters. **This defense
HOLDS.**

**ABU-4 — `UNIQUE(reporter_id, review_id)` stops one account spamming reports on one
target — and must NOT be read as a rate limit.** It bounds reports per *(reporter, target)*
pair at one. It does not bound reports per reporter across targets, nor accounts per human.
*Confidence: confirmed.* Source: `supabase/reviews.sql` (read 2026-07-18).

**Recorded because the constraint is easy to over-credit.** Combined with ABU-2 its
importance is mostly hygienic (a clean queue), not protective — the real anti-brigade defense
is that report counts do nothing automatically.

---

## Rate limiting — what exists and what does not

**ABU-5 — Supabase Auth ships rate limits at the AUTH endpoints.** Defaults recorded
2026-07-18: email endpoints **2/hour** (unless custom SMTP), OTP **360/hour**, verification
**360/hour per IP** (bursts to 30), MFA challenges **15/minute per IP**, **anonymous signups
30/hour per IP**. CAPTCHA is available on signup, sign-in and password reset. *Confidence:
confirmed.* Source: Supabase Going-into-Prod checklist (fetched 2026-07-18). Duplicated as
`RLS-30` in [`supabase-rls.md`](supabase-rls.md).

**ABU-6 — There is NO rate limit on ordinary data writes, and this is the chapter's central
gap.** Supabase's documented limits cover **auth** endpoints. An authenticated caller
POSTing to `/rest/v1/forum_posts`, `/rest/v1/reviews` or `/rest/v1/review_photos` is governed
only by RLS (may I write this row?) and CHECK constraints (is this row well-formed?) —
**neither of which counts.** *Confidence: confirmed by absence* — the fetched Going-into-Prod
checklist lists no Data API write limits, and no rate-limiting mechanism exists in any
`supabase/*.sql` file in this repo (grepped 2026-07-18).

**The proof, as required by INDEX rule 8.** One authenticated account, holding the committed
publishable key, runs:

```
for i in $(seq 1 10000); do
  curl -s -X POST "$SUPABASE_URL/rest/v1/forum_posts" \
    -H "apikey: $PUBLISHABLE" -H "Authorization: Bearer $USER_JWT" \
    -H "Content-Type: application/json" \
    -d '{"thread_id":"<any thread>","body":"flood"}' &
done
```

Every request satisfies `forum posts insert` (`auth.uid() = author_id`). Nothing in the
schema counts, throttles, or delays. The result is an unbounded flood by a **single
legitimate account** — precisely the "mechanical abuse" ABU-1 says we *do* guard, and the one
class of abuse the doctrine unambiguously authorizes us to stop. **Severity: MEDIUM today**
(small user base, manual cleanup feasible, and the blast radius is content rather than data
loss); **HIGH at any real traffic**, where it also becomes a storage/quota cost.

**ABU-7 — Sign-up rate limiting does not bound ACCOUNT COUNT.** ABU-5's 30 anonymous
signups/hour/IP is a *rate*, and it is per-IP. Over a day from one IP that is 720 accounts;
across a proxy pool it is unbounded. **No per-human account limit exists or can exist without
identity verification.** *Confidence: inference from ABU-5 (arithmetic on the documented
rate).*

**This is the sybil-resistance floor, and it is low.** Every control keyed to "one per
account" — `UNIQUE(user_id, part_id)` on reviews, `UNIQUE(reporter_id, review_id)` on reports
— inherits this ceiling. Such a constraint is only as strong as the cost of a new account,
and the cost of a new account here is approximately **an email address**.

**ABU-8 — The CAPTCHA option (ABU-5) is the one available account-cost lever that does not
require identity verification.** *Confidence: inference from ABU-5 + ABU-7.* It raises
per-account cost without touching content, so it is fully compatible with ABU-1's
content-neutrality requirement. **Whether it is currently enabled on this project is
UNESTABLISHED** — a dashboard setting, not repo state. Filed as a question for Douglas, per
`RLS-31`.

**ABU-9 — Astroturf resistance for PRODUCT reviews is `UNIQUE(user_id, part_id)` alone.**
One review per rider per part, described in-file as the anti-spam / anti-astroturf control.
*Confidence: confirmed.* Source: `supabase/reviews.sql` (read 2026-07-18).

**Combined with ABU-7, this is the honest picture:** the cost of N fake five-star reviews on
one part is N email addresses. **⚠ This bears directly on the load-bearing UNBIASED value** —
the ranking a rider sees would be manipulable by anyone willing to register accounts. Contrast
[`marketplace-payments.md`](marketplace-payments.md) MKT-19, where *marketplace* reviews
require a settled transaction and each fake signal therefore costs real money. **Product
reviews have no equivalent cost anchor, and no obvious one is available** — you cannot require
a purchase to review a part someone already owns. This is a genuine unsolved design problem,
not an implementation oversight, and it is flagged as **finding F4** in the reviews.sql
review.

---

## Mitigations available under the content-neutrality constraint

**ABU-10 — Candidate write-side rate limits, all content-neutral.** *Confidence: inference —
these are proposals, NOT implemented, and none has been validated against Postgres
performance or Supabase's platform behavior.* Recorded as design options for the coordinator,
explicitly not as recommendations to implement:
- **Per-user velocity trigger** — a BEFORE INSERT trigger counting the caller's rows in the
  table over a recent window and raising above a threshold. Simple, and it composes with the
  existing guard-trigger pattern (`RLS-19`) the repo already runs. Costs a count per insert.
- **Minimum inter-post interval** — reject a post within N seconds of the same author's
  previous one. Cheap (one indexed lookup), and it targets flooding specifically while barely
  touching a human typing at human speed.
- **Edge rate limiting** — Cloudflare already fronts the domain (Web Analytics is live), and
  edge limits stop the traffic before it reaches Postgres, which is where limits are most
  effective. **Cloudflare's rate-limiting capabilities on the current plan were NOT fetched
  or verified this round.**

All three are content-neutral: they measure rate, never meaning. All satisfy ABU-1.

**ABU-11 — Storage flooding is bounded by bucket limits, but NOT by count.** The
`review-photos` bucket enforces 5 MiB per file and an image-only MIME allowlist server-side,
and the per-review photo cap is a trigger — but **nothing bounds total objects per user
across reviews.** *Confidence: confirmed.* Source: `supabase/reviews.sql` (read 2026-07-18);
Supabase Storage access-control doc (fetched 2026-07-18).

**Proof sketch:** an authenticated user creates reviews across N parts (allowed — one per
part, thousands of parts exist) and attaches up to 6 photos × 5 MiB to each, all satisfying
every policy. At 1,000 parts that is up to **30 GB** from one account, none of it violating a
single constraint. **Severity: MEDIUM** — a cost/quota attack rather than a data-integrity
one, but it is real, cheap, and there is no control in the schema that would slow it down.

---

## The line, stated precisely

**ABU-12 — Where the free-speech line falls in practice.** *Confidence: confirmed as
doctrine* (`MEMORY.md` [[forum-automod-philosophy]]; `data/MARKETPLACE-SECURITY-MODEL.md`
§4.8).

| Guard (mechanical abuse) | Never guard (protected) |
|---|---|
| Flooding / volume / velocity | Opinions, however unpopular |
| Spam and scam links | Profanity and tone |
| Illegal content | Criticism of brands, products, the site, or Douglas |
| Doxxing / address exposure (MKT-18) | Viewpoint, political or otherwise |
| Off-platform-payment solicitation (marketplace only, MKT-21) | Being wrong |

**The test:** *could this rule be enforced without reading what the post means?* If yes, it is
a mechanical-abuse rule and is in scope. If it requires judging content, it is out of scope
and belongs to a human admin acting case-by-case — never to an automated system.

**ABU-13 — Admin moderation actions have no audit trail.** Admins may hide, edit and delete
any review, thread or post; **nothing records who did what, when, or why.** *Confidence:
confirmed by absence* — no audit table, trigger, or log column exists in any `supabase/*.sql`
file (grepped 2026-07-18). Maps to **A09:2025 Security Logging and Alerting Failures**
(`web-fundamentals.md` WEB-2).

**Why this matters more here than on a typical platform.** A free-speech-first site's
credibility rests on moderation being *visibly* restrained. Without a trail, "we only remove
mechanical abuse" is an unverifiable claim — there is no way for Douglas to audit his own
moderators, and no way to answer a user who says their post was removed for its viewpoint.
**The doctrine creates the requirement**: ABU-1 is a promise, and an unlogged system cannot
evidence a promise. See reviews.sql review finding **F6**.

---

## Gaps

To reach `professional` (L2):

- **No write-side rate limiting exists** (ABU-6) — the central gap. ABU-10's options are
  unvalidated sketches; none has been benchmarked or tested.
- **Cloudflare's actual rate-limiting capability on the current plan is unfetched** — this is
  probably the highest-leverage unknown in the chapter, since edge limiting is both the most
  effective placement and possibly already available.
- **CAPTCHA status unknown** (ABU-8) — a dashboard question for Douglas.
- **No sybil-detection research at all** — ABU-7 states the problem; nothing addresses it. No
  fetched sources on email-domain reputation, device fingerprinting, or account-age gating.
- **No audit-logging design** (ABU-13) — the requirement is named, the design is not started.
- **The forum's own anti-abuse posture has not been reviewed** — this chapter's facts come
  from `reviews.sql`; `forum_threads`/`forum_posts` are live *today* and have had no
  equivalent pass. **They carry the same ABU-6 exposure with none of the review.** Arguably
  the next round's target, since they are live and reviews are not.
- **No content-neutral spam-link handling** — scam links are named as in-scope abuse (ABU-12)
  but no mechanism is designed; note that URL allowlisting (`RLS-24`) is content-neutral and
  may generalize.
- **No L3/L4 content** — no brigade dynamics modelling, no abuse economics beyond MKT-19's
  cost-anchor observation, no coordinated-behavior detection.
