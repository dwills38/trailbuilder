# AFFILIATE / PARTNERSHIP PROCESS — ADVERSARIAL REVIEW (2026-07-18)

**Scope:** every outreach email draft, the image-license ask, sequencing/risk (including the
Tier A/B image decision), the unbiased-values check, and FTC-disclosure sanity.
**Method:** every factual claim in every draft was checked against the live repo at
`origin/main` (2ff6e6c) on 2026-07-18. Docs-only review; no code or catalog changes.
**Sources reviewed** (business docs live untracked at the repo root by design — PII guard):
`outreach-emails.md`, `MANUFACTURER-DATA-PLAYBOOK.md` (Part 3), `MANUFACTURER-PARTNERSHIP-KIT.md`,
`AFFILIATE-SIGNUP-RUNBOOK.md` (§3), `AFFILIATE-HANDOFF.md`, `PRODUCT-IMAGE-SOURCING.md`, plus the
tracked live pages `privacy.html` / `terms.html` / `affiliate-disclosure.html`.

**Live-repo ground truth used throughout (re-pull at send time — these drift):**

| Fact | Drafts claim | Live repo today |
|---|---|---|
| MTB catalog size | ~3,000 parts (07-13) | **5,023 parts** (`node validate.js`) |
| Verified rows | ~2,250 (07-13) | **2,972** |
| Buyer's guides | 10 (kit) / 17 (handoff) | **44** (`src/guides.js`) |
| Community forum | claimed live | **Confirmed live** (`forumPage` in `index.html`) |
| Retailer buy-links | "every listing links riders to where they can buy" | **0 of 5,023 rows carry `retailerLinks`; 0 carry `image`** |
| Affiliate programs joined | ("funded by disclosed affiliate links") | **None** — the live disclosure page itself says "Until a program is active…" |
| Legal pages | claimed live + footer-linked | Confirmed: all three tracked, deployed, cross-linked |

---

## 1 · Per-draft verdict table

| # | Draft | Verdict | Why (one line) |
|---|---|---|---|
| 1 | `outreach-emails.md` — Email A (image permission) | **DO NOT SEND** | Superseded: TrailBuilder branding, `[https://yourdomain]` placeholders, and the false "every listing links riders to where they can buy" claim |
| 2 | `outreach-emails.md` — Email B (partnership) | **DO NOT SEND** | Same: superseded by the Partnership Kit's Template B |
| 3 | `outreach-emails.md` — Email C (follow-up) + Partner Brief | **DO NOT SEND** | Same supersession; the brief repeats the buy-link claim |
| 4 | `MANUFACTURER-DATA-PLAYBOOK.md` Part 3 (A/B/C + brief) | **DO NOT SEND** | Byte-identical embedded copy of #1–#3 — same defects |
| 5 | Partnership Kit — **Template A** (enthusiast first touch) | **NEEDS WORK** | Two false-today claims (buy-links, and the placeholder sentence if Tier B ships); stale counts |
| 6 | Partnership Kit — **Template B** (larger-brand formal) | **NEEDS WORK** | Same buy-link claim; "FTC-compliant" self-certification; stale counts |
| 7 | Partnership Kit — **Template C** (follow-up nudge) | **SEND-READY** (once A/B are fixed) | No independent factual claims; honest, low-pressure, professional |
| 8 | Partnership Kit — **§2 license one-pager** | **NEEDS WORK** | Scope self-contradiction (sibling sites), "instant takedown is built into our platform", "Funded by disclosed affiliate links", ambiguous "nothing can be bought", "specs verbatim" promise |
| 9 | Signup Runbook — **§3 application answers** | **NEEDS WORK (minor)** | Strongest draft in the set; refresh counts at apply time; one internal inconsistency ("planned" guides vs live guides) |

Overall: the Partnership Kit is well-conceived — honest tone, one ask per email, the unbiased
line framed as a selling point, real researched contacts. The defects are **claims that were
true-ish on 2026-07-13 or are aspirational-stated-as-present**, plus one structural risk (Tier B)
that can turn the whole program against itself.

---

## 2 · Findings by severity

### CRITICAL-1 — Tier B makes the outreach emails self-defeating (THE BIG ONE)

**Quoted text** (Kit, Template A):
> "Right now [BRAND] products display with an honest placeholder graphic, because we don't use
> anyone's product photos without permission."

And (§2 one-pager): the entire permission framing rests on "we never display without a grant"
(provenance table, takedown pledge, the `PRODUCT-IMAGE-SOURCING.md` HARD RULE it cites).

**Why it's a problem.** The Tier B decision (unlicensed temporary images, go-word given
2026-07-18 with containment, final confirmation pending) and this outreach kit are **mutually
exclusive as written**. If Tier B ships and any outreach email is then sent:

- The quoted sentence becomes a **provably false statement in writing**, on file at the brand.
- The email is itself the **discovery mechanism**: it invites the brand's marketing team to visit
  buildmymtb.com, where — if that brand is in the Tier B population — they find their own images
  displayed without permission, directly under a claim that we don't do that.
- The failure mode isn't just a lost partnership: a brand that catches a written misrepresentation
  plus unlicensed use escalates to legal, and the story ("compatibility site caught misusing
  images while claiming it never does") is exactly the reputation the UNBIASED/honest brand
  cannot survive. The Affiliate lane's earlier objection — that a Tier B exclusion list
  approximates the whole catalog precisely because outreach is the discovery mechanism — is
  correct and this review confirms it independently.

**Concrete fix (pick one, before any send — Douglas's decision):**
1. **Outreach-first (recommended):** Tier B never populates any brand that has been, or will be,
   an outreach target. Since the §3 first wave + wave 2 + the big brands ≈ the catalog's verified
   core, this effectively means Tier B is limited to brands we will *never* email — a small,
   shrinking set. Honest version of the same conclusion: outreach and Tier A are the program;
   Tier B adds risk faster than it adds pixels.
2. **Tier A-only:** drop Tier B entirely; the placeholder sentence stays true forever.
3. **If Tier B ships anyway:** the placeholder sentence and the one-pager's framing MUST be
   rewritten to disclose the interim practice honestly — and be aware that an honest version
   ("we currently display product images we have not yet licensed, and would like to fix that
   for [BRAND]") converts a warm ask into a confession. There is no wording that makes
   "we used your photos, now may we?" land better than "may we?".

### CRITICAL-2 — "Every listing links to purchase channels" is false today

**Quoted text:**
- Template A: "every listing links out to where they can purchase."
- Template B: "In return, every [BRAND] listing links users to purchase channels, placing your
  products in front of riders at the point of purchase decision."
- Old kit (Email A): "Every listing links riders to where they can buy, so this drives
  qualified, ready-to-purchase traffic your way."

**Why it's a problem.** 0 of 5,023 catalog rows carry `retailerLinks`; no affiliate program has
been joined; the live disclosure page itself says retailer links aren't active. The entire
"what you get" side of the pitch — qualified traffic at the moment of decision — is a capability
the site **does not have at send time**. A brand marketing manager who clicks through and finds
no buy-links anywhere reads the email as inflated, and the honesty positioning collapses.

**Concrete fix (two-part):**
1. **Sequencing:** move the manufacturer-outreach gate from "LLC + `Doug@` email live" to
   "LLC + `Doug@` email + **at least one affiliate program approved with buy-links rendering on
   the live site**." Given the affiliate window opens ~Nov, that lands outreach ~Nov–Dec —
   which also fixes the traffic-leverage problem the kit itself acknowledges for big brands.
2. **Wording**, if any send happens before links are live — replace the false present tense
   with honest future tense. Rewrite for Template A's paragraph:
   > "What you get: your products shown correctly, with your own photography, in a tool riders
   > use at the moment they're deciding what to buy. We're onboarding retailer buy-links now
   > (AvantLink and Impact programs), so every [BRAND] listing will link out to where riders can
   > purchase — from you or your retailers."
   Rewrite for Template B's sentence:
   > "In return, [BRAND] listings place your products in front of riders at the point of
   > purchase decision, represented with your own imagery and your own data; retailer buy-links
   > are rolling out across the catalog via the affiliate networks."

### HIGH-3 — One-pager license scope contradicts itself (legal-reviewer escalation trigger)

**Quoted text** (§2, "Display on buildmymtb.com only" row):
> "Your images appear on your products' listings on our site (and its direct BuildMy* sibling
> sites, e.g. a per-discipline site). Nowhere else…"

**Why it's a problem.** The term is titled "on buildmymtb.com **only**" and then grants itself an
**open-ended family of future domains**. That's precisely the kind of expandable scope a brand's
legal reviewer cannot approve without escalation — it reads as "one site, plus any site we later
create." The scope question in the task brief ("can a brand's legal reviewer approve it without
escalation?") fails on this line alone.

**Concrete fix.** Either enumerate the exact domains ("buildmymtb.com and buildmybmx.com — and
no others without a fresh written yes from you"), or cut sibling sites entirely and re-ask per
site later. Recommended rewrite of the row:
> | **Display on buildmymtb.com only** | Your images appear on your products' listings at
> buildmymtb.com. Nowhere else — no other sites, no ads, no social, no resale, no AI training,
> no merchandising, no sublicensing. If we ever launch a sibling site (e.g. a BMX-specific
> builder), its use would need a fresh, separate yes from you. |

### HIGH-4 — "Instant takedown is built into our platform" overclaims

**Quoted text** (§2, "Revocable" row): "instant takedown is built into our platform."

**Why it's a problem.** No image pipeline exists — 0 rows carry `image`, and the ImageService is
a design, not a built system. Claiming built tooling that doesn't exist is a small lie inside a
document whose whole job is establishing that we don't tell small lies.

**Concrete fix:** "we remove your images promptly on request — takedown is a commitment we
design for, not an afterthought." (Once the ImageService ships with a real kill-switch, the
stronger sentence becomes true and can return.)

### HIGH-5 — "Funded by disclosed affiliate links" is false today

**Quoted text** (§2, "Who we are"): "Funded by disclosed affiliate links; never by placement."

**Why it's a problem.** There is no affiliate revenue; no program has been joined. The site's own
live disclosure page is more honest than the one-pager ("Until a program is active, the retailer
links on the Site are ordinary, non-commissioned links" — and today there are no retailer links
at all).

**Concrete fix:** "Free to use; funded by disclosed affiliate links as those programs come
online — never by placement." (Post-affiliate-approval, revert to the present tense.)

### MEDIUM-6 — "Specs shown verbatim from your data" is a promise we may not be able to keep

**Quoted text** (§2, commitments): "Where you give us spec data, your numbers are what riders
see — we don't 'improve' them."

**Why it's a problem (values check).** The project's verification history includes catching
manufacturer-published numbers that were wrong (a fork listed ~450 g heavy on the maker's own
page; a frame weight corrected against the maker's tech doc), and the provenance policy accepts
third-party *measured* weights precisely because maker pages are sometimes off. Promising
verbatim display forfeits the right to correct false data — and if a partner brand's number is
wrong, the site would be knowingly showing riders a wrong spec *because of a commercial
relationship*. That is a bias vector: partner data getting a truth-exemption that non-partner
data doesn't get.

**Concrete fix:** "Your published data becomes the source of truth for your listings. If our own
verification ever disagrees with a number you've published, we'll flag it to you first rather
than silently overriding either side — accuracy is the product for both of us."

### MEDIUM-7 — "Riders see your new releases correctly from day one" implies partner-priority coverage

**Quoted text** (§2, delivery paragraph): "If you can name a contact for future asset updates…
riders see your new releases correctly from day one."

**Why it's a problem (values check).** Read plainly, this commits BuildMyMTB to day-one catalog
coverage *for partner brands' new products* — a freshness/coverage priority non-partner brands
don't get. Catalog inclusion and update priority must stay editorially driven, or "unbiased"
quietly erodes at the coverage layer even while verdicts stay clean. (Receiving a feed making
updates *cheaper* is fine; *committing* to preferential speed is not.)

**Concrete fix:** "…and your preferred channel for those, we can keep your listings current as
your line evolves." Drop "from day one."

### MEDIUM-8 — Ambiguous "nothing on the site can be bought, including by you"

**Quoted text** (§2, zero-ranking-favor bullet): "nothing on the site can be bought, including
by you."

**Why it's a problem.** In context it means "no placement/verdict is for sale," but a first-time
reader can parse it as "products can't be purchased through the site" — which contradicts the
buy-link pitch two paragraphs earlier. An outreach doc can't afford a sentence whose plain
reading undercuts its own value proposition.

**Concrete fix:** "no placement, ranking, verdict, or badge on the site can be bought — by
anyone, including you."

### MEDIUM-9 — Stale site facts baked into the kit (all currently *under*stated, but pinned)

**Quoted text** (Kit header): "Site facts used in every pitch (true as of 2026-07-13):
~3,000 parts · ~2,250 manufacturer-verified · community forum · 10 buyer's guides."

**Why it's a problem.** Today the truth is 5,023 parts / 2,972 verified / **44** guides (forum
confirmed live — that claim is good). Understatement is the safe direction, but: (a) the kit
instructs senders to use pinned numbers rather than to re-pull them, so the figures will
eventually drift *over*stated as demotions land (the verified-flag audit already demoted 55 rows
on its branch); (b) "10 buyer's guides" in Template B undersells 4.4× — leaving real credibility
on the table. Note the verified *ratio* moved from ~74% to ~59% as the catalog grew — quote
absolute numbers, not percentages.

**Concrete fix.** Replace the pinned facts line with a procedure: "Before any send, re-pull:
`node validate.js` (parts + verified counts), guide count from `src/guides.js`, and confirm the
claims paragraph against them." Same for the §3 per-brand rows/verified columns.

### MEDIUM-10 — Image ask vs the ImageService design: three gaps a brand's lawyer would catch later

The §2 asset ask is genuinely good (per-SKU + per-colorway, manifest mapping image→SKU/MPN,
format flexibility, update channel — exactly what an API-first image pipeline needs). Three gaps:

1. **Hosting/serving rights.** "Display on buildmymtb.com only" does not clearly grant
   **re-hosting and serving from our own infrastructure/CDN** (the ImageService is designed as an
   independent API-first provider — its serving domain may not literally be buildmymtb.com). A
   strict reading of "display on buildmymtb.com only" could later be argued to prohibit our own
   image CDN. Add: "hosted and served from our own infrastructure (including our image CDN) for
   display on the site."
2. **The grantee.** The license should run to the **LLC entity** (the site's operator), not to
   the site name — the one-pager's "Who we are" already introduces the LLC; make the grant row
   say "granted to [LLC NAME], operator of buildmymtb.com."
3. **Derivative bound.** The "resize, crop, thumbnail, format conversion" carve-out is right;
   add "and compression/re-encoding for web delivery" so the pipeline's transformations are
   unambiguously covered.

### MEDIUM-11 — The superseded TrailBuilder kit is still lying around, send-ready-looking

`outreach-emails.md` (root) and `MANUFACTURER-DATA-PLAYBOOK.md` Part 3 both present
copy-paste-ready drafts branded **TrailBuilder** with `[https://yourdomain]` placeholders and
the false buy-link claim. The file header even says "copy-paste ready." A future session (or
Douglas in a hurry) could grab the wrong kit.

**Concrete fix:** add a banner at the top of both: "⚠ SUPERSEDED 2026-07-13 by
`MANUFACTURER-PARTNERSHIP-KIT.md` — do not send these drafts" (edit is in the business-doc lane,
untracked — hand to the Affiliate session).

### LOW-12 — "FTC-compliant affiliate disclosure" is a self-certification

Template B and the kit header assert FTC **compliance** — a legal conclusion. The disclosure
page itself is well done (clear, conspicuous, footer-linked, in-app note near links, honest
"not yet an Associate" staging), and its claims match the emails'. But say what's verifiable:
"a public affiliate disclosure consistent with FTC guidance." Not counsel; flagging, not opining.

### LOW-13 — Confirm `Doug@buildmymtb.com` actually receives mail before any send

The live disclosure page already publishes `Doug@buildmymtb.com` as the contact, and every
template's From: line assumes it. The handoff last recorded Cloudflare routing as **pending**.
If routing isn't live, outreach replies (and disclosure-page questions) bounce — the single
worst first impression available. Verify with a round-trip test send before the first outreach.

### LOW-14 — Business-doc entity references have drifted from the actual LLC decision

`AFFILIATE-HANDOFF.md` and the runbook still reference the earlier state choice (Pennsylvania
registry) — the recorded decision has since moved to a different state and a chosen LLC name
(both recorded in the gitignored LLC playbook and clearance doc; deliberately not reproduced
here). Before sends: fill `[LLC NAME]` from the clearance doc, and update the handoff so the
Affiliate session doesn't act on the stale state. Also note the Impact "Operating as" dropdown
answer flips from *Individual* to *Company* once formation completes.

### LOW-15 — Cane Creek phone route: guardrail already covers it, keep it

§3 suggests phoning Cane Creek (no email findable). Guardrail 3's "a verbal or phone yes gets a
confirming email before any image ships" is exactly right — just make sure the phone script
includes the same no-bias disclosure the emails carry, so the pitch is identical in every channel.

---

## 3 · Values check (Douglas's doubled UNBIASED value) — verdict: architecture clean, two wording leaks

**What's right (and genuinely strong):** every template states the no-bias line *as a selling
point* ("no brand can pay for a better verdict or ranking, including you"); Template A even
tells brands a "no" costs them nothing ("your parts keep their same honest verdicts either
way") — that's the unbiased value made load-bearing in the pitch, exactly as intended. The
guardrails §4 correctly inherit the audited `retailerLinks`/`image` isolation, and the
category-by-category image-population rule (vs brand-by-brand) is a sharp, real defense against
visual salience bias that most sites would never think of.

**The two leaks, both fixable by wording (found above):**
- **MEDIUM-6** — the "specs verbatim" promise creates a partner truth-exemption.
- **MEDIUM-7** — "new releases from day one" creates partner-priority coverage.

No email promises ranking, placement, prominence, or verdict consideration anywhere — checked
every draft. No program term reviewed (AvantLink/Impact/Amazon, per the runbook's cited pages)
requires editorial favor; Amazon's link-back/live-fetch rules are architectural constraints, not
bias pressure. One standing watch-item: per-merchant affiliate *commission differentials*
(e.g. one retailer at 3%, another at 10%) must never influence which retailer's link renders
first once multiple `retailerLinks` exist per part — that ordering rule should be written down
before the first feed lands (deterministic, commission-blind). Flagged for the ImageService/
feed-importer design, not for the emails.

## 4 · Compliance sanity (FTC) — verdict: live pages are in good shape

- `affiliate-disclosure.html`: clear + conspicuous, plain-language, footer-linked, promises an
  in-app note near retailer links, and honestly stages the Amazon notice ("We are not yet an
  Amazon Associate"). `privacy.html` and `terms.html` both reference affiliate links
  consistently. The emails' claims about the site's disclosure posture **match the live pages**.
- The disclosure's code-level claim ("`retailerLinks` … the engine never reads it") is true in
  the live source (checked: `checkBuild` has no reference; 0 rows carry the field).
- Residual items: LOW-12 (don't self-certify "FTC-compliant"), and when Amazon is eventually
  joined, the staged notice must be flipped the same day links go live — add that to the
  affiliate-approval runbook checklist.

## 5 · Sequencing — recommended order (consolidated)

1. **Now:** fix the drafts per §2 (wording fixes are ~an hour of edits); banner the superseded
   TrailBuilder kit; verify `Doug@` routing round-trip.
2. **Douglas decides:** the Tier B / outreach mutual-exclusion (CRITICAL-1 — this review
   independently reaches the Affiliate lane's "outreach-first" recommendation).
3. **LLC formation completes** (bank step already scheduled) → fill `[LLC NAME]`, flip Impact
   answers to *Company*.
4. **~Nov:** AvantLink application (domain-age window) → Worldwide Cyclery first, per the
   competitive audit → first buy-links render on the live site.
5. **After buy-links are live:** first-wave manufacturer outreach (§3's 15 brands) — the
   "qualified traffic" pitch is then simply true, and Templates A/B need no future-tense hedging.
6. **Big brands:** wait for traffic stats, per the kit's own (correct) §0 rule.

## 6 · Decisions needed from Douglas before a single email goes out

1. **Tier B vs outreach** (CRITICAL-1): outreach-first / Tier A-only / Tier B-with-total-
   exclusion. As written they cannot coexist; the exclusion list ≈ every brand worth emailing.
2. **Outreach gate** (CRITICAL-2): keep "LLC + email" as the gate with future-tense wording, or
   move the gate to "first affiliate links live" (recommended — it also solves the leverage
   problem for free).
3. **Sibling-site scope** (HIGH-3): pre-license named sibling domains now, or single-domain
   grants with fresh asks later.
4. **The verified-badge / price-policy ruling** (open since the verified-flag audit): affects
   how strongly the emails may say "verified spec-by-spec" — the specs claim is solid, but
   1,000+ verified rows still carry sample prices; if a brand ever checks its own MSRPs against
   the site, "verified" needs to already mean what the page says it means.
5. **Confirm `Doug@buildmymtb.com` routing is live** (LOW-13) — blocking for any send.

---

*Docs-only review on branch `audit/affiliate-process-1`. Gates run as no-op proof: validate,
full test suite, typecheck (results in the branch's commit/report). No PII from the untracked
business docs is reproduced here; entity details are referenced by document location only.*
