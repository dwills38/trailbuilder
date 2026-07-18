# Marketplace & Payments — Security Corpus

**Maturity: foundation** (L1/L3-design coverage — see [`CURRICULUM.md`](CURRICULUM.md)).
Seeded 2026-07-18 from [`data/MARKETPLACE-SECURITY-MODEL.md`](../../data/MARKETPLACE-SECURITY-MODEL.md)
(the 2026-07-17 off-live design round), carrying its Stripe / PCI SSC / Bike Index / FTC-cited
sources over intact. **Nothing here is built** — the marketplace is docs-only — so these are
architectural commitments to test later, not verified controls. No L2 depth: no Stripe or PCI
page was fetched *this* round; every external citation is inherited. See `## Gaps`.

Threat model · never-touch-money doctrine · PCI scope · trust tiers · stolen goods ·
counterfeits · disputes. Read [`INDEX.md`](INDEX.md) first.

Fact IDs are stable and append-only (`MKT-n`).

> **Status caveat, stated once and applying to every fact below.** These facts describe a
> *design*, not a running system. When the marketplace is built, each becomes a claim
> requiring the PROOF bar (INDEX rule 8) against real code. Do not cite an MKT fact as
> evidence that a control exists.

---

## The dominant decision

**MKT-1 — WE NEVER TOUCH THE MONEY. This single decision removes the large majority of
marketplace risk.** Every catastrophic marketplace-security failure — chargeback fraud,
triangulation with stolen cards, seller-payout diversion, escrow-holding liability, PCI scope
— routes through one question: **does the platform custody funds?** The moment BuildMyMTB
holds a buyer's payment, even momentarily, it inherits PCI-DSS obligations,
money-transmitter licensing questions, chargeback liability, negative-balance risk on
connected accounts, and standing as the party a defrauded rider sues. *Confidence: confirmed
as the design's recommendation.* Source: `data/MARKETPLACE-SECURITY-MODEL.md` §0, citing
[Stripe Connect risk/liability docs](https://docs.stripe.com/connect/risk-management) and
[Stripe identity verification for connected accounts](https://docs.stripe.com/connect/identity-verification).

**Recommendation (strong, per the design): facilitator, not custodian.** Funds route
buyer → processor → seller; we take an application fee; the money never lands in a
BuildMyMTB-controlled account.

**Why this is the chapter's first fact:** most of the rest of the architecture only makes
sense once custody is settled. It determines what we store (MKT-16), what we can adjudicate
(MKT-15), and how much regulatory surface we carry (near zero). **A future proposal that
quietly reintroduces custody — "just hold it for 24 hours," "a wallet balance," "store
credit" — is a security decision disguised as a product feature and must be escalated, not
absorbed.**

---

## The threat model — seven named threats

**MKT-2 — T1 Fake / phantom listings.** An item that doesn't exist, or a photo scraped from
elsewhere; take payment, never ship. Bike shape: a "like-new XX SL crank, $200" with a
manufacturer press photo, no serial, no in-hand shot. A top-5 marketplace fraud type.
*Confidence: confirmed (design doc, external-cited).* Sources: `MARKETPLACE-SECURITY-MODEL.md`
§1, citing [SEON](https://seon.io/resources/online-marketplace-fraud/) and
[Radar](https://radar.com/blog/5-common-types-of-marketplace-fraud).

**MKT-3 — T2 Stolen goods — the signature bike-world crime.** Bikes and parts are stolen,
serials **spray-painted or filed off**, then sold as "generic." A used-parts market that
ignores this **becomes a fence.** *Confidence: confirmed (design doc, external-cited).*
Sources: `MARKETPLACE-SECURITY-MODEL.md` §1, citing
[Mountain Bike Action](https://mbaction.com/are-you-being-fooled-by-counterfeit-mountain-bike-components/)
and [sprocketfox](https://sprocketfox.io/xssfox/2025/09/03/stolen/).

**MKT-4 — T3 Payment fraud, including TRIANGULATION.** Chargebacks and stolen cards, plus
triangulation: list an item, take payment, then buy the real item with a *stolen* card to
fulfil — so the marketplace and a third victim both eat it. High-value drivetrain and
suspension parts are liquid and resell fast, making them prime triangulation goods.
Triangulation and buyer/seller collusion are "the hardest to catch." *Confidence: confirmed
(design doc, external-cited).* Sources: `MARKETPLACE-SECURITY-MODEL.md` §1, citing
[SEON](https://seon.io/resources/online-marketplace-fraud/) and
[didit](https://didit.me/blog/seller-fraud-patterns-e-commerce-de/).

**MKT-5 — T4 Account takeover (ATO).** Phish or credential-stuff a legitimate account, then
run scams under its borrowed reputation, or divert payouts. MFA plus behavioral signals are
the standard defense. *Confidence: confirmed (design doc, external-cited).* Sources:
`MARKETPLACE-SECURITY-MODEL.md` §1, citing
[Radar](https://radar.com/blog/5-common-types-of-marketplace-fraud) and
[didit](https://didit.me/blog/marketplace-seller-fraud-detection-ca/).

**MKT-6 — T5 Shill / fake reviews and reputation gaming.** Fabricated ratings to launder a
scam account to a green rating; collusion rings trading with themselves to farm reputation.
*Confidence: confirmed (design doc, external-cited).* Sources: `MARKETPLACE-SECURITY-MODEL.md`
§1, citing [SEON](https://seon.io/resources/online-marketplace-fraud/) and
[fraud.net](https://www.fraud.net/glossary/marketplace-fraud).

**MKT-7 — T6 Counterfeit parts — the one with a SAFETY dimension.** Fake carbon frames and
bars use inferior carbon and incomplete layup, bond alloy cups where genuine parts use
integrated carbon, and **fail destructive testing**; a counterfeit bar or wheel failing
mid-trail can be catastrophic. A 70–90%-off "genuine" high-end part is the tell.
*Confidence: confirmed (design doc, external-cited).* Sources:
`MARKETPLACE-SECURITY-MODEL.md` §1, citing
[Specialized's counterfeit page](https://www.specialized.com/us/en/counterfeit),
[Velo teardown](https://velo.outsideonline.com/not-all-frames-are-created-equal-a-look-deep-inside-the-carbon-in-counterfeit-bikes/),
and [MBA](https://mbaction.com/are-you-being-fooled-by-counterfeit-mountain-bike-components/).

**T6 is the threat that outranks its fraud-loss severity.** Every other threat costs money.
This one can injure a rider. Rank counterfeit findings by **physical consequence**, not by
transaction value — a $90 fake bar is a worse finding than a $900 non-delivery.

**MKT-8 — T7 Off-platform / address-harvest scams.** Luring the counterparty to an
unprotected channel; harvesting the seller's address to rob them. The documented case: a
seller of £60 lights was scammed into revealing his address, and **thieves then stole three
bikes worth thousands** from it. "Let's finish this on WhatsApp / Zelle" is the universal
fraud on-ramp. *Confidence: confirmed (design doc, external-cited).* Source:
`MARKETPLACE-SECURITY-MODEL.md` §1, citing
[road.cc](https://road.cc/news/three-bikes-worth-thousands-stolen-in-facebook-marketplace-scam).

**MKT-9 — Scale context.** Social-media-platform-driven scam losses reached **$2.1B in 2025,
an eightfold rise since 2020**. *Confidence: partial — a media report citing FTC data, not a
fetched FTC primary.* Source: `MARKETPLACE-SECURITY-MODEL.md` §1 citing
[road.cc](https://road.cc/news/three-bikes-worth-thousands-stolen-in-facebook-marketplace-scam).
**Flagged for re-sourcing against the FTC directly before this number is used publicly.**

---

## Our structural advantage

**MKT-10 — The catalog is a FRAUD ORACLE, and that is our differentiator.** Generic
marketplaces have no idea what a real part is; we have a structured, id-keyed database of
real components with real interfaces and real MSRPs. Three consequences:
1. **Every listing binds to a catalog `id`** (append-only, `canonicalId()` resolves retired
   ones). A listing is not free-text "carbon bars lol" — it is *this specific part*. That
   single constraint kills a large class of T1 vague-listing scams and makes T6 counterfeits
   **nameable and reportable against a known genuine spec**.
2. **MSRP is known**, so the documented 70–90%-below-MSRP counterfeit tell becomes a
   **computable, brand-neutral flag** rather than a human hunch.
3. **The compat engine already knows what fits**, so "listing → add to your build" can be
   *checked*.
*Confidence: confirmed (design doc).* Source: `MARKETPLACE-SECURITY-MODEL.md` §2.

**Reframe worth keeping:** the marketplace is **the catalog with provenance, sellers and a
handshake — not a free-text classifieds board.** The catalog does security work for us.

**MKT-11 — Trust TIERS, not a binary verified flag — and no tier is ever sold.** Listing
trust: `catalog-matched` → `photo-verified` → `serial-captured` → `provenance-documented`.
Seller trust: processor-KYC-verified → transaction-history → community standing. Payment
trust: processor-mediated always; **off-platform payment is not a tier, it is a red banner.**
*Confidence: confirmed (design doc).* Source: `MARKETPLACE-SECURITY-MODEL.md` §3.

**"No tier is ever sold" is a security rule, not just a bias rule.** A purchasable trust
signal is a purchasable fraud instrument — it converts money into victim trust, which is
precisely what a scammer wants to buy. The UNBIASED value and the anti-fraud architecture
point the same direction here.

---

## The defenses

**MKT-12 — Listing integrity (T1/T6): catalog-id binding + in-hand photo challenge + price
sanity flag.** The **photo challenge** — the seller must photograph the part alongside a
**rotating challenge token** (e.g. today's code on a sticky note) — defeats scraped-press-photo
phantom listings cheaply and is called out as the single most effective, lowest-tech listing
defense. The price flag **informs, never blocks** (real deals exist), exactly like a compat
warning. *Confidence: confirmed (design doc).* Source: `MARKETPLACE-SECURITY-MODEL.md` §4.1.

**MKT-13 — Stolen-goods defense (T2): first-class serial capture + Bike Index lookup.** A
**missing or defaced serial is itself a surfaced flag** (the documented stolen-goods tell).
Bike Index is a free nonprofit registry with ~1.43M catalogued bikes and 158k+ logged stolen,
offering a public REST/JSON API (`/api/v3/search`, unauthenticated read with rate limiting).
On listing creation we query the serial; a hit surfaces a warning and routes to human review.
We should also *encourage registration*, growing the anti-theft commons rather than
parasitizing it. *Confidence: confirmed (design doc, external-cited).* Sources:
`MARKETPLACE-SECURITY-MODEL.md` §4.2, citing [bikeindex.org](https://bikeindex.org/) and its
[API v3 docs](https://bikeindex.org/documentation/api_v3).

⚠ **Honest-limits clause, which is mandatory in the UI:** many components have no serial, and
a clean Bike Index result means **"not reported stolen," NOT "provably legitimate."** The UI
must state the weaker, true thing — the same discipline as "No conflicts found" rather than
"All compatible." **An overclaiming trust badge is a security defect**, because riders act on
it.

**MKT-14 — ATO defense (T4): MFA + sensitive-change friction + payout cool-down.** MFA
required for payout-detail or bank changes and high-value listings; changing a payout
destination triggers re-verification, notifies the existing contact, and imposes a
**cool-down before the new destination is usable** — which is what actually defeats payout
diversion, the entire point of an ATO. New-device + immediate-high-value-listing is a review
trigger. Auth already runs on Supabase, and MFA is a supported extension requiring no new
custody. *Confidence: confirmed (design doc, external-cited).* Source:
`MARKETPLACE-SECURITY-MODEL.md` §4.7.

⚠ **Dependency, currently unmet:** MFA is not implemented anywhere in this project today
(see [`supabase-rls.md`](supabase-rls.md) `## Gaps`). MKT-14 is therefore a **blocking
prerequisite** for any marketplace launch, not a nice-to-have — and per RLS-6 the enforcement
hook (`aal2` in a policy) exists but is unused.

**MKT-15 — Dispute flow: we are an EVIDENCE BROKER, not an adjudicator of money.** Because
we hold no funds, the money dispute rides the processor's rails. Our role: an immutably
stored **listing snapshot at sale time**, structured evidence from both sides, on-platform
messages, tracking and serial; clear cases resolve to a payout-hold/refund instruction plus a
reputation consequence; contested cases escalate to the processor's chargeback process, and
stolen goods to the real recovery channels (Bike Index flag + law enforcement — **we
facilitate, we do not investigate crimes**). *Confidence: confirmed (design doc).* Source:
`MARKETPLACE-SECURITY-MODEL.md` §4.6.

**Every dispute outcome is bias-audited** — outcomes must not correlate with take rate,
promoted-listing status, or brand. Log outcomes for the periodic bias audit.

**MKT-16 — Escrow: use a licensed third party or nothing. NEVER build our own.** Escrow is
genuinely strong (buyer inspects before release; no chargebacks for the seller), but building
it in-house makes us a money custodian → money-transmitter licensing, PCI scope, exactly the
liabilities MKT-1 exists to avoid. **Recommendation: launch on delivery-gated processor
payouts** (escrow-*like* protection without being the escrow agent), and offer **integrated
third-party escrow as an opt-in tier for high-value items** later. *Confidence: confirmed
(design doc, external-cited).* Sources: `MARKETPLACE-SECURITY-MODEL.md` §4.4–4.5, citing
[Escrow.com](https://www.escrow.com/), [Rapyd](https://www.rapyd.net/blog/secure-payments-marketplace/),
and [Trustap](https://www.trustap.com/).

---

## PROHIBITED DATA

**MKT-17 — NEVER store full card numbers (PAN), CVV/CVC, magnetic-stripe/track data, or
PINs.** PCI-DSS forbids storing sensitive authentication data (CVV, track, PIN) **even
encrypted**, full stop. The processor tokenizes cards; **we store a token or nothing.** This
is what keeps us out of PCI scope. *Confidence: confirmed (design doc, external-cited).*
Sources: `MARKETPLACE-SECURITY-MODEL.md` §5, citing
[PCI SSC data-storage do's & don'ts](https://listings.pcisecuritystandards.org/pdfs/pci_fs_data_storage.pdf)
and [PCI DSS v4.0.1](https://www.middlebury.edu/sites/default/files/2025-01/PCI-DSS-v4_0_1.pdf?fv=AKHVQBp6).

**The safest data is the data we never hold.** This is the strongest posture available and it
follows for free from MKT-1. **Any feature request that would store card data is an automatic
escalation to Douglas** — there is no version of it that is implemented quietly.

**MKT-18 — Physical addresses must never appear in chat.** Shipping labels are generated by
the processor/carrier integration so the address is never a message. This directly defeats
the T7 address-harvest that cost the road.cc seller three bikes. *Confidence: confirmed
(design doc).* Source: `MARKETPLACE-SECURITY-MODEL.md` §4.8.

---

## Reputation integrity

**MKT-19 — Reviews only from completed, processor-settled transactions.** No transaction → no
review. This alone kills most shill farming (T5): a rating cannot be fabricated without a
real settled sale, and settled sales cost the fraudster real money. *Confidence: confirmed
(design doc).* Source: `MARKETPLACE-SECURITY-MODEL.md` §4.8.

**MKT-19 is the strongest anti-astroturf mechanism in the whole corpus, and it is worth
understanding WHY: it attaches a real financial cost to each fake signal.** That is abuse
economics (an L4 idea) applied concretely — the defense does not try to *detect* the fake, it
makes the fake *expensive*.

⚠ **CONTRADICTION-adjacent — flagged for the coordinator.** The staged
`supabase/reviews.sql` implements **per-product** reviews with **no transaction binding** —
any authenticated account may review any catalog part. That is a different product from
marketplace seller reviews and the two should not be conflated, but it means MKT-19's
protection **does not apply to product reviews**, whose only anti-abuse control is
`UNIQUE(user_id, part_id)`. See the reviews.sql review, finding **F4**. Naming it here so the
gap is visible from both directions.

**MKT-20 — Weight reputation by COUNTERPARTY DIVERSITY, not raw count.** Ring-controlled
buyer+seller accounts trading with themselves are "the hardest to catch"; detect via shared
payment instruments, devices, addresses, shipping loops and velocity. *Confidence: confirmed
(design doc, external-cited).* Source: `MARKETPLACE-SECURITY-MODEL.md` §4.8, citing
[SEON](https://seon.io/resources/online-marketplace-fraud/).

**MKT-21 — The free-speech line, applied to transactions.** The forum's free-speech-first
posture governs **opinions**; marketplace anti-fraud governs **mechanical abuse**
(off-platform-payment solicitation, scam links). Same "guard abuse, not viewpoint" principle,
different surface. *Confidence: confirmed (design doc).* Source:
`MARKETPLACE-SECURITY-MODEL.md` §4.8. See [`abuse-moderation.md`](abuse-moderation.md).

**MKT-22 — The hard rules apply here too.** **No e-bikes** — a used-parts marketplace never
lists motors, batteries or e-drive units until Douglas's explicit word. **No pop-ups** —
nothing about a marketplace, including "list your part" nudges, KYC prompts or dispute
notices, may ever auto-appear; every surface is a page or a click-opened panel. A marketplace
is a monetization pattern, and no monetization pattern may use a pop-up. *Confidence:
confirmed.* Sources: `CLAUDE.md` Hard rules 1–2; `MARKETPLACE-SECURITY-MODEL.md` preamble.

**Security-relevant consequence of the no-pop-up rule:** security-critical notices (a stolen-serial
warning, a dispute update, an off-platform-payment warning) **cannot be delivered by modal
interrupt**. They must be inline on a page the user opened, or via email/in-app inbox. Design
the notification path around that constraint from the start rather than discovering it at
implementation — and note it is arguably *better* security UX, since users who are never
interrupted by pop-ups do not learn to dismiss them reflexively.

---

## Gaps

To reach `professional` (L2) / `master` (L3):

- **Zero primary sources fetched this round.** Every external citation is inherited from
  `MARKETPLACE-SECURITY-MODEL.md`. Stripe Connect risk docs, the PCI SSC data-storage PDF,
  and the Bike Index API docs should be **fetched directly** before any of these facts is
  relied on for an implementation decision — the corpus's own rule 2 demands the primary.
- **MKT-9's $2.1B figure needs re-sourcing** against the FTC directly.
- **No fraud-detection implementation depth** — velocity limits, device fingerprinting, the
  actual signals and thresholds for MKT-20's collusion detection.
- **No KYC/identity-verification detail** — what Stripe Connect actually collects, what we
  see of it, what our retention obligations are.
- **No jurisdictional analysis** — money-transmitter rules are state-by-state in the US, and
  Douglas's LLC is being formed in South Dakota. MKT-1 avoids the question rather than
  answering it, which is correct for launch but not forever.
- **No data-retention / erasure design** for marketplace data (listing snapshots are
  deliberately immutable per MKT-15, which is in direct tension with a deletion request —
  unexamined).
- **Nothing on tax reporting** (1099-K thresholds for sellers) — adjacent to security via the
  identity data it forces us to touch.
- **MFA (MKT-14) is unbuilt** and is a launch blocker.
