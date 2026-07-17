# MARKETPLACE-SECURITY-MODEL.md — Used-parts marketplace threat model + defense architecture (OFF-LIVE design round)

**Status: OFF-LIVE. Docs only.** Nothing here is wired into the live app (`index.html`,
`src/compat.js`, `src/schema.js`), no schema is added, no table is created, no dependency is
pulled. This is a design round for a **future** used-parts marketplace that ties into the Kit
Builder / Bike Builder — the "marketplace↔builder used-parts tie-in" Douglas has flagged, with
**one hard requirement: it must be scam-secure.** This document is the threat model and the
defense architecture worth building *before a single line of marketplace code is written.*
It **recommends and leaves the call to Douglas** — see **DECISIONS-FOR-DOUGLAS** at the end.

Date: 2026-07-17. Templates followed: `data/STRIDER-ANALYSIS.md`, `data/ROAD-MODEL.md`
(status banner, DECISIONS-FOR-DOUGLAS pattern, cite-everything discipline).

> **Hard rules (unchanged, apply here too).** **No e-bikes** — a used-parts marketplace never
> lists motors, batteries, or e-drive units until Douglas's explicit word (rule 1). **No pop-ups**
> — nothing about a marketplace, including "list your part" nudges, KYC prompts, or dispute
> notices, may ever auto-appear; every marketplace surface is a page or a click-opened panel the
> user asked for (rule 2). A marketplace is a *monetization pattern*, and rule 2 says no
> monetization pattern may use a pop-up.

> **The load-bearing product value is UNBIASED.** The bias guardrail that governs the catalog
> governs the marketplace doubly: search ranking, "verified" badges, and dispute outcomes must
> favor **no manufacturer, no seller who paid us, and no listing we earn more on.** A marketplace
> creates brand-new bias surfaces (paid promotion, ranking, our own take rate) that the affiliate
> layer never did. Every design choice below is measured against "does this let money bend the
> result the rider sees?" See [[manufacturer-bias-audits]] [[product-values]].

---

## 0. The one decision that removes 80% of the risk: WE NEVER TOUCH THE MONEY

Every catastrophic marketplace-security failure in the research below — chargeback fraud,
triangulation with stolen cards, seller-payout diversion, escrow-holding liability, PCI scope —
routes through **one question: does the platform custody funds?** The moment TrailBuilder holds a
buyer's payment, even for a second, we inherit: PCI-DSS obligations, money-transmitter licensing
questions, chargeback liability, negative-balance risk on connected accounts, and the full weight
of being the party a defrauded rider sues.

**Recommendation (strong): the platform is a facilitator, not a custodian.** Payment is handled
by an established processor's marketplace product (Stripe Connect or equivalent), which takes on
the KYC/identity-verification and payments-compliance obligations and can be integrated so the
platform is **not responsible for connected-account negative balances** (Stripe's "Managed Risk"
posture). We route funds buyer→processor→seller and take our cut as an application fee; **the
money never lands in a TrailBuilder-controlled account.** ([Stripe Connect risk/liability docs](https://docs.stripe.com/connect/risk-management),
[Stripe identity verification for connected accounts](https://docs.stripe.com/connect/identity-verification))

This is the honest option and it is also the safest one. It is called out first because **most of
the defense architecture below only makes sense once this is settled** — it decides what we store
(§5), what disputes we can even adjudicate (§4.6), and how much regulatory surface we carry (near
zero). The alternative models (true escrow, platform-held balances) are analyzed in §4.5 and
**not recommended for launch.**

---

## 1. Threat model — the seven ways a bike-parts marketplace gets scammed

Marketplace fraud is one of the fastest-growing fraud categories; social-media-platform-driven
scam losses hit **$2.1B in 2025, an eightfold rise since 2020**
([road.cc / FTC-cited reporting](https://road.cc/news/three-bikes-worth-thousands-stolen-in-facebook-marketplace-scam)).
Facebook Marketplace is the cautionary tale the entire cycling world already knows: "lack of
regulation, enforcement and inherent design makes it the perfect platform for stolen goods"
([road.cc](https://road.cc/news/three-bikes-worth-thousands-stolen-in-facebook-marketplace-scam),
[MTBR thread on FB-facilitated theft](https://www.mtbr.com/threads/how-much-bike-theft-do-you-think-is-being-facilitated-on-fb-marketplace.1245160/)).
Our differentiator has to be that **we are the marketplace that took theft, counterfeits, and
fraud seriously from day one.** The named threats, each with the bike-specific shape it takes:

| # | Threat | Generic form | Bike-parts-specific shape |
|---|--------|--------------|---------------------------|
| T1 | **Fake / phantom listings** | Item that doesn't exist, or a photo scraped from elsewhere; take payment, never ship. | A "like-new XX SL crank, $200" with a manufacturer press photo. No serial, no in-hand shot, price too good. Phantom listings are a top-5 marketplace fraud type ([SEON](https://seon.io/resources/online-marketplace-fraud/), [Radar](https://radar.com/blog/5-common-types-of-marketplace-fraud)). |
| T2 | **Stolen goods** | Fencing stolen property through the platform. | The signature bike-world crime. Bikes/parts are stolen, serials **spray-painted or filed off**, then sold as "generic" ([Mountain Bike Action](https://mbaction.com/are-you-being-fooled-by-counterfeit-mountain-bike-components/), [sprocketfox "is this bike stolen"](https://sprocketfox.io/xssfox/2025/09/03/stolen/)). A used-parts market that ignores this *becomes a fence.* |
| T3 | **Payment fraud** | Chargebacks, stolen cards, **triangulation** (list item, take payment, buy the real item with a *stolen* card to fulfill — the marketplace and a third victim both eat it). | Same mechanics; high-value drivetrain/suspension parts are liquid and resell fast, making them prime triangulation goods. Triangulation + buyer/seller collusion are "the hardest to catch" ([SEON](https://seon.io/resources/online-marketplace-fraud/), [didit](https://didit.me/blog/seller-fraud-patterns-e-commerce-de/)). |
| T4 | **Account takeover (ATO)** | Phishing / credential-stuffing a legit account, then listing scams or diverting payouts under its good reputation. | A long-standing trusted seller's account gets taken over and used to run T1 at scale on borrowed trust. MFA + behavioral signals are the standard defense ([Radar](https://radar.com/blog/5-common-types-of-marketplace-fraud), [didit](https://didit.me/blog/marketplace-seller-fraud-detection-ca/)). |
| T5 | **Shill / fake reviews & reputation gaming** | Fabricated ratings to inflate a seller or bury a competitor; collusion rings that trade with themselves. | Fake "great seller!" feedback to launder a scam account to a green rating; ring-controlled buyer+seller accounts self-dealing to farm reputation ([SEON](https://seon.io/resources/online-marketplace-fraud/), [fraud.net](https://www.fraud.net/glossary/marketplace-fraud)). |
| T6 | **Counterfeit parts** | Knock-offs sold as genuine. | A *huge* MTB problem. Fake carbon frames/bars use "inferior carbon and an incomplete layup," alloy cups bonded where genuine uses integrated carbon, and **fail destructive testing** — a counterfeit bar/wheel failure mid-trail "can be catastrophic" ([Specialized counterfeit page](https://www.specialized.com/us/en/counterfeit), [Velo teardown](https://velo.outsideonline.com/not-all-frames-are-created-equal-a-look-deep-inside-the-carbon-in-counterfeit-bikes/), [MBA](https://mbaction.com/are-you-being-fooled-by-counterfeit-mountain-bike-components/)). A 70–90%-off "genuine" high-end part is the tell. This one has a **safety** dimension the others don't. |
| T7 | **Off-platform / address-harvest scams** | Luring the counterparty off-platform to a channel with no protection; harvesting the seller's address to then rob them. | The road.cc case: a seller of £60 lights was scammed into revealing his address, and **thieves then stole three bikes worth thousands** from that address ([road.cc](https://road.cc/news/three-bikes-worth-thousands-stolen-in-facebook-marketplace-scam)). "Let's finish this on WhatsApp / Zelle" is the universal fraud on-ramp. |

**Design consequence:** the defenses are not one system. T1/T6 are *listing-integrity* problems
(solved with our catalog + provenance). T2 is a *provenance/registry* problem (solved with serial
capture + Bike Index). T3 is a *payment* problem (solved by not touching money + processor fraud
tooling). T4 is an *identity/session* problem. T5 is a *reputation-integrity* problem. T7 is a
*keep-it-on-platform* problem. §4 addresses each.

---

## 2. What makes US uniquely able to defend — the catalog is a fraud oracle

Generic marketplaces (FB, Craigslist) have **no idea what a real part is.** We do. The live
catalog is a structured, id-keyed database of real components with real interfaces, real MSRPs,
and a growing set of manufacturer-**verified** rows (`verified:true` + `source`). That is a
fraud-detection asset no general marketplace has:

- **Every listing binds to a catalog `id`** (the append-only brand-qualified ids, `canonicalId()`
  resolves retired ones). A listing is not free-text "carbon bars lol" — it is *"this is a
  `hb-oneup-carbon-35-800`."* That single constraint kills a large class of T1 vague-listing scams
  and makes T6 counterfeits *nameable and reportable against a known genuine spec.*
- **MSRP is known**, so a price 70–90% below MSRP — the documented counterfeit/too-good tell
  ([MBA](https://mbaction.com/are-you-being-fooled-by-counterfeit-mountain-bike-components/)) —
  is a **computable** flag, not a human hunch. We can badge "listing is 82% below MSRP — verify
  authenticity" automatically and unbiasedly (the same rule for every brand).
- **The compat engine already knows what fits what**, so "listing → add to your build" can be
  *checked* (§6) rather than hoped.

This reframes the whole product: **the marketplace is the catalog with provenance, sellers, and a
handshake — not a free-text classifieds board.** The catalog is doing security work for us.

---

## 3. Trust tiers — the spine everything hangs on

Rather than one binary "verified" flag (which the catalog already learned is too coarse — see the
provenance-tier lesson in `tools/VERIFY-PROTOCOL.md`), the marketplace should have **explicit,
honestly-labeled trust tiers** so a green dot never overclaims (the same discipline as the app's
"No conflicts found" ≠ "guaranteed compatible"). Proposed:

- **Listing trust** — `catalog-matched` (binds to a real id) → `photo-verified` (in-hand photos
  with a written challenge code, not press shots) → `serial-captured` (serial recorded + checked
  against registries, §4.2) → `provenance-documented` (receipt/original-owner evidence). Higher
  tiers rank higher and show a truthful badge; **no tier is ever sold** (bias rule).
- **Seller trust** — identity-verified-by-processor (Stripe KYC, §0) → transaction-history score
  → community standing. Reputation is **earned by completed, undisputed, non-self-dealing
  transactions**, never bought, never inflated by review count alone (§4.7 kills shill farming).
- **Payment trust** — always processor-mediated; off-platform payment is **never** a tier, it is a
  **red banner** (§4.8).

The tiers are the UI's honesty mechanism: a buyer always sees *why* a listing is trusted, in the
same plain-language, non-overclaiming voice the compat dots use.

---

## 4. The defense architecture, threat by threat

### 4.1 Listing integrity (defends T1, feeds T6) — bind every listing to the catalog
- **Mandatory catalog-id binding.** A listing must resolve to a catalog `id` (or a "propose a new
  part" queue that a human/auditor clears — never free-text that ships live). Reuses
  `canonicalId()`/`ALIASES` so retired ids still bind.
- **In-hand photo challenge.** To exceed `catalog-matched`, the seller uploads photos that include
  a **rotating challenge token** (e.g., "write today's code on a sticky note next to the part").
  This defeats scraped-press-photo phantom listings (T1) cheaply — the single most effective,
  lowest-tech listing defense.
- **Automated price-sanity flag.** Compute `listPrice / MSRP`; below a threshold, attach a
  truthful, brand-neutral "well below MSRP — verify authenticity & provenance" note. Never blocks
  (real deals exist); it *informs*, exactly like a compat warning.
- **No auto-appearing anything** while doing all this (rule 2): flags render inline on the listing
  page the user opened.

### 4.2 Stolen-goods defense (defends T2) — serial capture + registry check
This is the defense that makes us *not Facebook Marketplace.*
- **Serial-number field is first-class** on any listing for a serialized item (frames, some
  components). A **missing or defaced serial is itself a surfaced flag** — defaced serials are the
  documented stolen-goods tell ([MBA](https://mbaction.com/are-you-being-fooled-by-counterfeit-mountain-bike-components/),
  [sprocketfox](https://sprocketfox.io/xssfox/2025/09/03/stolen/)).
- **Bike Index integration.** Bike Index is a free nonprofit registry with **~1.43M cataloged
  bikes, 158k+ logged stolen**, and a **public REST/JSON API** (`/api/v3/search`,
  read search is unauthenticated with rate-limiting) ([bikeindex.org](https://bikeindex.org/),
  [API v3 docs](https://bikeindex.org/documentation/api_v3),
  [Wikipedia](https://en.wikipedia.org/wiki/Bike_Index)). On listing creation we query the serial;
  a hit surfaces "⚠ this serial matches a bike reported stolen on Bike Index" and routes to human
  review. This is a **vendored-client / server-side call** pattern (no CDN, cite the version) and a
  read-only lookup — low risk, high signal.
- **Encourage registration, not just checking.** Offer sellers a "register this frame's serial"
  nudge (link out to Bike Index) so our marketplace *grows* the anti-theft commons rather than
  parasitizing it.
- **Honest limits:** components often have no serial; a clean Bike Index result is "not reported
  stolen," **not** "provably legitimate." The UI must say the weaker, true thing.

### 4.3 Counterfeit defense (defends T6) — the safety-critical one
- **Catalog spec as ground truth.** Because a listing names a real `id`, we can show the genuine
  part's real weight/spec next to the listing; counterfeits are "much heavier" and dimensionally
  off ([MBA](https://mbaction.com/are-you-being-fooled-by-counterfeit-mountain-bike-components/)).
- **Authenticity checklist surfaced per category** (author-controlled guide content, the
  `src/guides.js` pattern): serial-scratch check, layup/finish tells, "verify with the maker's app
  where one exists" (Specialized's serial-check app is the model — [Specialized](https://www.specialized.com/us/en/counterfeit)).
- **Price flag (shared with §4.1)** does double duty — 70–90%-off is the counterfeit tell.
- **Safety-critical categories** (bars, steerers, cranks, wheels, forks) get a stronger, standing
  "counterfeit structural parts can fail catastrophically — buy provenance-documented" note.
- **Counterfeit reports feed a maker-neutral flag**, never a "this brand is fake-prone" signal
  (bias rule): the flag is on the *listing*, not the *brand*.

### 4.4 Payment fraud (defends T3) — solved mostly by §0
- **Never touch money (§0).** Removes chargeback custody, triangulation-payout, and negative-
  balance liability from us structurally.
- **Processor fraud tooling.** Stripe Radar / equivalent scores every payment; the processor's KYC
  gates seller onboarding ([Stripe risk docs](https://docs.stripe.com/connect/risk-management)).
- **Delivery-confirmation-gated payout** (via the processor's hold/transfer, *not* our custody):
  funds release to the seller on tracked-delivery confirmation, blunting both "never shipped" (T1)
  and giving a defined dispute window (§4.6). This is escrow-*like* protection **without us being
  the escrow agent** — the key distinction analyzed next.

### 4.5 Escrow analysis — why NOT for launch (defends T3, honestly)
Escrow is genuinely strong: buyer inspects before funds release; **"no chargebacks, ever"** for
the seller; a neutral third party holds funds until conditions are met
([Escrow.com](https://www.escrow.com/), [Rapyd](https://www.rapyd.net/blog/secure-payments-marketplace/),
[Trustap](https://www.trustap.com/)). But there are two ways to get it, and only one is safe for us:
- **DON'T build our own escrow / hold balances.** That makes us a money custodian → money-
  transmitter licensing, PCI scope, the exact liabilities §0 exists to avoid. **Not recommended.**
- **DO consider a third-party escrow/guaranteed-payment provider** (Escrow.com API, Trustap,
  processor-native delayed-payout) **for high-value transactions** (e.g., full frames, complete
  bikes), where the fee is justified and the fraud stakes are highest. This keeps custody with a
  licensed third party while giving buyers real inspect-before-release protection.
- **Recommendation:** launch on **§4.4 delivery-gated processor payouts** (covers most parts);
  offer **integrated third-party escrow as an opt-in tier for high-value items** later. Never
  in-house escrow.

### 4.6 Dispute flow (defends T3/T1) — what we can actually adjudicate
Because we don't hold money, our dispute role is **evidence-broker + reputation-enforcer**, and
the *money* dispute rides the processor's rails:
1. Buyer opens a dispute within the delivery-confirmation window (in-app, no pop-up — a page).
2. Both sides submit structured evidence: the listing snapshot (immutably stored at sale time),
   in-hand photos, tracking, serial, messages **(all on-platform — see §4.8)**.
3. Clear cases (not-as-described vs. catalog spec, defaced serial, non-delivery per tracking)
   resolve to a **payout-hold/refund instruction to the processor** + a reputation consequence.
4. Genuinely contested cases escalate to the processor's chargeback process (their liability, §0)
   and, for stolen goods, to **the real recovery channels** (Bike Index flag + law-enforcement
   report the parties are pointed to — we facilitate, we don't investigate crimes).
5. **Every dispute outcome is bias-audited**: outcomes must not correlate with take-rate,
   promoted-listing status, or brand. Log outcomes for the periodic bias audit
   ([[manufacturer-bias-audits]]).

### 4.7 Account-takeover defense (defends T4)
- **MFA available and encouraged**, required for payout-detail or bank changes and high-value
  listings — behavioral + MFA are the documented ATO defenses
  ([Radar](https://radar.com/blog/5-common-types-of-marketplace-fraud), [didit](https://didit.me/blog/marketplace-seller-fraud-detection-ca/)).
  Auth already runs on Supabase (`src/account.js`); MFA is a supported extension, no new custody.
- **Sensitive-change friction:** changing the payout destination triggers re-verification + a
  notification to the account's existing contact, and a **cool-down** before the new destination
  is usable (defeats payout diversion, the whole point of ATO).
- **Session/behavior signals:** new-device + immediate-high-value-listing is a review trigger.
- Notifications are **email/in-app inbox**, never a site pop-up (rule 2).

### 4.8 Reputation integrity + keep-it-on-platform (defends T5 + T7)
- **Reviews only from completed, processor-settled transactions.** No transaction → no review. This
  alone kills most shill farming (T5); you can't fabricate a rating without a real settled sale,
  and settled sales cost the fraudster real money.
- **Self-dealing / collusion detection:** ring-controlled buyer+seller trading with itself is
  "the hardest to catch" ([SEON](https://seon.io/resources/online-marketplace-fraud/)); detect via
  shared payment instruments/devices/addresses/shipping loops and velocity, and **weight reputation
  by counterparty diversity**, not raw count.
- **On-platform messaging + payment is the protected path; going off-platform forfeits all
  protection.** Surface a **standing red warning** when a conversation trends toward
  Zelle/WhatsApp/"pay me directly" — this is the exact on-ramp that cost the road.cc seller three
  bikes ([road.cc](https://road.cc/news/three-bikes-worth-thousands-stolen-in-facebook-marketplace-scam)).
  **Never reveal a physical address in-thread**; shipping labels are generated by the processor/
  carrier integration so the address is never a chat message (defeats T7 address-harvest).
- Free-speech note: the forum's free-speech posture ([[forum-automod-philosophy]]) governs
  *opinions*; marketplace anti-fraud governs *mechanical abuse* (off-platform-payment solicitation,
  scam links) — the same "guard abuse, not viewpoint" line, applied to transactions.

---

## 5. PROHIBITED DATA — what we must NEVER store or touch

The safest data is the data we never hold. Because payment is processor-mediated (§0), we can keep
our own store **almost free of sensitive data**, which is the strongest possible posture.

**NEVER store, ever:**
- **Full card numbers (PAN), CVV/CVC, magnetic-stripe/track data, or PINs.** PCI-DSS forbids
  storing sensitive authentication data (CVV, track, PIN) *even encrypted*, full stop
  ([PCI SSC data-storage do's & don'ts](https://listings.pcisecuritystandards.org/pdfs/pci_fs_data_storage.pdf),
  [PCI DSS v4.0.1](https://www.middlebury.edu/sites/default/files/2025-01/PCI-DSS-v4_0_1.pdf?fv=AKHVQBp6)).
  The processor tokenizes cards; **we store a token or nothing.** This keeps us out of PCI scope.
- **Bank-account / routing numbers for payouts.** These live with the processor's connected-account
  KYC, not with us ([Stripe identity verification](https://docs.stripe.com/connect/identity-verification)).
- **Government IDs / SSN / passport / driver's-license images.** Identity verification is the
  **processor's** job (KYC) — the raw documents never come to us. (Handling these ourselves is
  also squarely in the platform's Prohibited-actions list.)
- **Plaintext passwords** — auth is delegated to Supabase; we store no credential material.
- **Precise home addresses in messages or listings.** Shipping addresses go to the label
  generator/processor, not into a stored chat or a public listing (T7 defense, §4.8).

**Store, minimally and protected:**
- Catalog-id bindings, listing metadata, in-hand photo references, **serial numbers** (needed for
  T2 — treat as sensitive-ish; they're already public on Bike Index by design but still minimize),
  processor **payment tokens / connected-account ids** (references, not instruments), reputation
  events derived from settled transactions, dispute evidence snapshots.
- **Immutable listing snapshots at sale time** — for disputes (§4.6), store what was *claimed*, so
  "not as described" is adjudicable.

Rule of thumb: **if losing our database would let anyone move money or steal an identity, we're
storing the wrong things.** Under §0 + this list, a breach of our store leaks listings and
reputation — bad, but not card/identity catastrophe.

---

## 6. Builder ↔ marketplace integration — without weakening either side

The tie-in is the whole point: **your build's parts become listable; listings become buildable.**
The risk is that wiring them together lets marketplace concerns (money, bias, fraud) leak into the
builder's trusted, unbiased compat verdicts. The firewall:

- **Build → listable ("sell what you're replacing").** From a saved build/garage inventory
  ([[current-work-queue]] inventory feature), a part a rider owns can seed a listing **pre-bound to
  its catalog id** — the cleanest possible listing (starts at `catalog-matched` for free, §3). The
  builder hands the marketplace an *id*, nothing more.
- **Listing → buildable ("will this used part fit my bike?").** A listing names an `id`, so
  "add to my build" runs the **existing, unmodified `checkBuild`** and shows the real compat
  verdict. This is a *feature multiplier*: no other used marketplace can tell you if the used part
  you're eyeing fits the bike you're building.
- **The firewall — non-negotiable, and it mirrors the affiliate firewall
  ([[affiliate-push]]):** marketplace data (price, seller, our take, promoted status)
  **NEVER feeds `checkBuild` or `compatOf`.** A verdict is computed from part specs only, exactly
  as today. A listing being expensive, promoted, or high-margin must not turn a red dot green or a
  green dot gold. The engine does not know the marketplace exists; the marketplace *reads* the
  engine's verdicts, never writes to them. This is the same architectural discipline that keeps
  affiliate links unbiased-by-construction, extended to a two-sided market.
- **Bias surface to watch:** ranking used listings. Default sort must be a **neutral, published
  rule** (e.g., trust-tier then price, same for all sellers/brands) — never "who paid for
  placement" without a **clearly labeled** `Promoted` tag that is visually unmistakable and never
  bleeds into the default/organic order. This gets its own line in the periodic bias audit.

---

## 7. Phasing — what to build first (recommendation)

The marketplace is large; the security posture lets it ship in defensible slices:
1. **Foundation (do first):** §0 processor-facilitator decision locked; §5 prohibited-data list as
   a schema constraint from row one; §4.1 catalog-id-bound listings + in-hand photo challenge;
   §3 trust tiers as the data model's spine.
2. **Anti-theft + anti-counterfeit (the differentiator):** §4.2 serial capture + Bike Index
   read-check; §4.3 authenticity guides + price-sanity flag. *This is the marketing story* — "the
   marketplace that fights bike theft."
3. **Transactions:** §4.4 delivery-gated processor payouts; §4.6 dispute flow; §4.7 ATO hardening.
4. **Scale/trust:** §4.8 reputation-from-settled-sales + collusion detection; opt-in third-party
   escrow for high-value items (§4.5).
- Ship each slice on green gates behind an `ACCOUNTS_ENABLED`-style feature gate (the committed-
  constant pattern), OFF-LIVE until Douglas's word, exactly like BMX/DJ staged.

---

## 8. Open technical questions (non-blocking, for whoever builds it)
- Which processor exactly (Stripe Connect is the reference here, but Adyen/Braintree marketplace
  products, or PayPal's marketplace product, deserve a head-to-head on fees + Managed-Risk parity).
- Bike Index API rate limits at our volume + whether to cache/register vs. live-query per listing.
- International scope (Bike Index is global but registry coverage varies; stolen-check confidence
  is US/UK-strongest).
- Whether serialized-component registries beyond Bike Index (BikeRegister UK, maker programs) are
  worth federating.

---

## DECISIONS-FOR-DOUGLAS

*(No action taken on any of these — recommendations only. This round never prompts you; these are
parked for when you pick the marketplace up.)*

- **Q1 — Payment custody (the big one).** Recommendation: **facilitator model, we NEVER hold funds**
  (§0) — processor-mediated (Stripe Connect or peer), we take an application fee, no custody, near-
  zero regulatory surface. Confirm this is the direction before any marketplace code. *This one
  decision shapes everything else.*
- **Q2 — Escrow.** Recommendation: **no in-house escrow ever**; launch on delivery-gated processor
  payouts; add **opt-in third-party escrow (Escrow.com/Trustap) for high-value items** (frames,
  complete bikes) later (§4.5). OK?
- **Q3 — Bike Index integration depth.** Recommendation: **yes, integrate** (read-check on every
  serialized listing + encourage registration, §4.2) — it's free, nonprofit, has a public API, and
  is *the* anti-theft differentiator. Confirm you want theft-checking as a headline feature.
- **Q4 — Serial requirement.** Should a serialized item (frame, complete bike) be **required** to
  have a serial to list, or is "no serial" merely flagged? Recommendation: **flagged, not blocked**
  at launch (many legit private sellers lost the sticker), tightened later. Your call on strictness.
- **Q5 — Counterfeit posture.** Recommendation: **inform, don't police** — surface authenticity
  checklists + price flags + spec comparison, never auto-delist by brand (bias rule). Comfortable
  with "we warn, the buyer decides," or do you want harder gates on safety-critical categories?
- **Q6 — Promoted listings / paid placement.** Do we ever allow paid promotion? Recommendation: if
  yes, **only as an unmistakably-labeled `Promoted` tag that never enters organic ranking**, audited
  for bias. Or forbid it entirely to keep the marketplace as clean as the catalog. Your call — this
  is a UNBIASED-value decision, not just a revenue one.
- **Q7 — Naming / site split.** Does the marketplace live inside BuildMyMTB, or as a sibling
  (BuildMyMTB Marketplace / a distinct brand), consistent with the BuildMyBMX/BuildMyKit split
  thinking ([[bmx-golive]] [[road-gravel-expansion]])?
- **Q8 — Reviews scope.** Marketplace seller reviews are proposed as **settled-transaction-gated**
  (§4.8). This is separate from the product-review idea in [[product-roadmap-ideas]] (1–5★ on
  *parts*). Keep them as two distinct systems, or unify? Recommendation: **separate** — seller trust
  and part quality are different questions.

---

## Sources

**Bike-world fraud & theft**
- [road.cc — FB Marketplace address-harvest → 3 bikes stolen; "$2.1B / 8× since 2020" scam-loss figure](https://road.cc/news/three-bikes-worth-thousands-stolen-in-facebook-marketplace-scam)
- [sprocketfox — "Is this bike on Facebook Marketplace stolen?" (serial-check walkthrough)](https://sprocketfox.io/xssfox/2025/09/03/stolen/)
- [MTBR forum — bike theft facilitated on FB Marketplace](https://www.mtbr.com/threads/how-much-bike-theft-do-you-think-is-being-facilitated-on-fb-marketplace.1245160/)

**Counterfeit parts**
- [Mountain Bike Action — counterfeit MTB components; defaced serials & 70–90%-off tell](https://mbaction.com/are-you-being-fooled-by-counterfeit-mountain-bike-components/)
- [Velo — teardown of counterfeit carbon frames (inferior layup, alloy cups, fails testing)](https://velo.outsideonline.com/not-all-frames-are-created-equal-a-look-deep-inside-the-carbon-in-counterfeit-bikes/)
- [Specialized — counterfeit awareness + serial-check app model](https://www.specialized.com/us/en/counterfeit)

**Marketplace fraud taxonomy**
- [SEON — online marketplace fraud (triangulation, collusion "hardest to catch")](https://seon.io/resources/online-marketplace-fraud/)
- [Radar — 5 common marketplace fraud types + prevention](https://radar.com/blog/5-common-types-of-marketplace-fraud)
- [didit — seller fraud patterns / marketplace fraud detection (ATO, MFA, KYC)](https://didit.me/blog/seller-fraud-patterns-e-commerce-de/)
- [fraud.net — marketplace fraud glossary (fake reviews, ATO, triangulation)](https://www.fraud.net/glossary/marketplace-fraud)

**Payments, escrow, KYC, liability**
- [Stripe — Connect risk & liability management](https://docs.stripe.com/connect/risk-management)
- [Stripe — identity verification for connected accounts (KYC)](https://docs.stripe.com/connect/identity-verification)
- [Rapyd — securing marketplace payments / multi-party fraud](https://www.rapyd.net/blog/secure-payments-marketplace/)
- [Escrow.com — escrow model + API](https://www.escrow.com/)
- [Trustap — marketplace escrow / secure P2P payments](https://www.trustap.com/)

**Prohibited data / PCI-DSS**
- [PCI SSC — Data Storage Do's and Don'ts (never store CVV/track/PIN)](https://listings.pcisecuritystandards.org/pdfs/pci_fs_data_storage.pdf)
- [PCI DSS v4.0.1 full standard](https://www.middlebury.edu/sites/default/files/2025-01/PCI-DSS-v4_0_1.pdf?fv=AKHVQBp6)

**Registry**
- [Bike Index — registry (1.43M bikes, 158k stolen) + public REST/JSON API](https://bikeindex.org/)
- [Bike Index — API v3 documentation](https://bikeindex.org/documentation/api_v3)
- [Bike Index — Wikipedia (scale, LeadsOnline law-enforcement integration)](https://en.wikipedia.org/wiki/Bike_Index)
