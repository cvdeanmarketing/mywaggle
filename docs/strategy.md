# Waggle Ecommerce Redesign: Strategy, Findings & Recommendations

Prepared October 14, 2026 · Prototype branch: `claude/index-html-main-brand-y7nhuq`

This document collects everything from the audit and redesign: what we found on the current site, what the prototype changes, and the business decisions leadership needs to make. Each recommendation is marked:

- **Built**: implemented in the prototype storefront.
- **Decision**: needs a leadership or finance call before it can be built or launched.
- **Ops**: an operational change outside the website.

---

## 1. Executive summary

Waggle sells a broader product family than the current site communicates. The homepage, quiz, events and much of the copy speak to RV owners, while the catalog already serves pet owners at home, travelers, people without WiFi and property owners. The redesign repositions Waggle as a **connected pet safety brand** ("Protect What Matters. Wherever Life Takes You."), organizes the store around customer situations instead of RV jargon, and makes subscription costs clear before purchase.

The biggest opportunities, in order of likely revenue impact:

1. **Broaden the front door beyond RV** (homepage, navigation, quiz). **Built**
2. **Make subscription cost feel like a service, not a fee**: yearly-first pricing, per-day framing, and what's included. **Built**
3. **Lengthen the plan trial from 3 days to 30 days** (test it). **Decision**
4. **Fix program economics**: referral payouts, Alpha rewards and ambassador rewards currently overlap and pay out before the return window closes. **Decision** + **Built** (proposed structure)
5. **Close the review gap**: 30 reviews on the "Most Popular" product undercuts "100K+ pet parents." **Ops**
6. **Clean up conflicting product data** across Waggle's own pages before launch. **Ops**

---

## 2. Audit of the current site

### 2.1 Positioning and information architecture

| Finding | Impact | Redesign |
|---|---|---|
| Hero and much of the site lead with RV use cases. The "Find Your Fit" quiz is RV-only ("Do you travel with pets in your RV?", "camera for backing up your RV"). | Home pet owners, travelers and no-WiFi customers don't see themselves. | New hero, lifestyle-based navigation, and a 4-question quiz covering pets, home/property, RV, travel and no-WiFi. **Built** |
| Navigation is organized by company structure ("Team With Us", "Community", "Wag Reads"), not by shopping need. | Shoppers have to hunt for products. | Primary nav: Shop All · Pet Safety · Pet Cameras · Travel & Adventure · Home & Property · RV Solutions · Bundles · Wag Reads · Find Your Waggle. Every dropdown starts with "View all," then breaks out into pages. **Built** |
| Discount banners ("National Savings Day," "Extra 10% SAVINGS10") dominate the hero and announcement bar. | Trains customers to wait for codes and pushes the product story below the fold. | Hero tells the product story. The offer moves to an engagement-triggered modal. **Built** |
| "Find Your Fit" only covers RV products. | Recommends nothing for home pet owners. | New quiz recommends across the whole catalog and never recommends a WiFi device when WiFi isn't reliable. **Built** |

### 2.2 Product data conflicts (resolve before launch). **Ops**

Waggle's own pages publish different numbers for the same products. The prototype shows the figure from the current product page and records the conflict in a collapsible "Prototype: data sources & verification" panel on each product page.

| Product | Conflict |
|---|---|
| Pet Monitor Lite+ | Product page $99 (compare $199). An exclusive-deals page shows $79 (compare $259). |
| Pet Monitor Pro+ | Battery backup published as 24h, 36h and 96h on different pages. Older pages say Verizon-only, current page says 3 networks. |
| Pro+ Satellite | Sale price $299 is consistent, but the strike-through price is $399 on one page and $599 on another. |
| RV 4G Mini Camera | One snapshot shows $269 (compare $539), likely a multi-pack. Multi-pack pricing isn't clearly labeled. |
| RV WiFi Mini Cam | Product page $119. Structured data and retailers show $59. Resolution listed as 3MP and as 1080p. |
| WaggleCam Pro | Retail listings say 2K, Waggle blog says 1080p. |
| Home & Roam Bundle | $219 on bundle pages, $199/$249 on another, and a near-identical bundle at $229 (compare $427). |
| Pet Scout / RV 4G Scout bundles | Different pages assign different cameras to the same bundle name. |
| 4G Network Plan | Support pages say $24.99/mo. The subscription policy page says $29.99/mo. |
| Temperature reading frequency | Homepage says "every single second." The product page says every ten minutes. |

### 2.3 Trust and social proof

- **Reviews are thin.** The RV 4G Mini Camera, labeled "Most Popular," shows 4.2 stars from **30 reviews**, next to homepage claims of 100K+ pet parents and 1,700+ Amazon ratings. Shoppers notice that gap.
- **Unverifiable testimonials.** The referral and Waggle Live pages use first-name testimonials ("Sandra – Tennessee," "Rachel T.") with specific dollar amounts. The prototype doesn't reuse them. If they're real, keep written consent on file. If they're illustrative, remove them (FTC endorsement guidance).
- **Strong independent coverage is under-used.** Dogster, Catster, RV LIFE, Camp Addict, The Wayward Home and Dog Gear Review have all reviewed Waggle. The prototype links to each review. **Built**

---

## 3. What the redesign changes

### 3.1 Brand and messaging. **Built**

- Primary headline: **"Protect what matters. Wherever life takes you."** with the supporting copy as briefed.
- Under the hero, three plain-language proof points make it clear what Waggle sells within five seconds: *Temperature & power alerts · Pet cameras · Built-in 4G, no WiFi needed.*
- Retained brand elements: lowercase "waggle" wordmark, terracotta accent, near-black sections, and the Lexend and Lato type pairing from the live site.
- Alternative headlines worth testing:
  - "Know they're safe. Even without WiFi." (leads with the main differentiator)
  - "Pet safety that goes where you go." (travel-led)
  - "The moment it's too hot, you'll know." (temperature-led, for summer campaigns)

### 3.2 Homepage structure. **Built**

1. Header with mega menu (each dropdown opens with "View all")
2. Hero: emotional headline, clear product positioning, illustrated product family and live-alert cards
3. Shop the Waggle family: Pet Safety Monitors · Home Pet Cameras · 4G Cameras · Driving Visibility
4. Shop by lifestyle: Home all day · Heat waves & outages · Road trips · RV life · Off-grid & no WiFi · Cabin & property
5. Find Your Waggle quiz (embedded and interactive)
6. Bestsellers
7. Why Waggle
8. Connected ecosystem (devices, app, and Vet/Vault/Places services)
9. Product comparison
10. Independent reviews and press
11. Build-your-own bundle
12. Wag Reads guides and Waggle Live sessions
13. FAQ
14. Footer with trust bar

### 3.3 Find Your Waggle quiz. **Built**

Four questions: what you're protecting, where, what matters most, and how reliable your WiFi is. A rules engine recommends only devices whose verified capabilities fit the answers. **WiFi-only devices are excluded unless WiFi is reliable.** The result shows the best fit, why it fits, an alternative, a compatible bundle, connectivity and subscription requirements, and add-to-cart buttons.

Sample results from QA: home + reliable WiFi + live video → WaggleCam Pro · RV + no WiFi + temperature → Pet Monitor Pro+ · property + no WiFi + video → RV 4G Mini Camera · RV + driving visibility → RV Observation System.

### 3.4 Shopping experience. **Built**

- Category pages for each use case, with plain-English buying guidance and links to related guides
- Filters ("Works without WiFi," connectivity, features, type) and sorting
- Product pages: benefit-led headline, verified price, key features, a "How it connects" explainer, a plan card, compatibility, specs, FAQ (with structured data), cross-sells and a sticky add-to-cart bar on mobile
- Bundle builder: published bundle pricing applies **only when the selection exactly matches a published bundle**, so there are no invented discounts
- Cart drawer with "Works well with" cross-sells and an ongoing-plan disclosure
- Demo checkout: contact → shipping → payment (hosted-provider placeholder, no card fields) → review with a required plan acknowledgment

### 3.5 Promotions. **Built**

- No discount banner in the hero.
- Configurable offer modal that **never shows on arrival**. It triggers after about 25 seconds on site, after scrolling about halfway with some dwell time, or on exit intent. Once per session, hidden for 14 days after dismissal, never on cart or checkout, accessible close button, optional email capture, and a "skip email, just show the code" option.
- Currently configured with SAVINGS10, the code advertised on the live site. Confirm its stacking rules with bundle pricing in the commerce platform before launch. **Decision**

---

## 4. Subscription pricing and trial. **Decision** + **Built**

### 4.1 Show the plan as a service, not a fee. **Built**

Customers usually see the monthly price first, and the real risk is that $24.99/mo looks steep next to Ring and Blink. Three ways to soften it:

1. **Lead with yearly.** $199/yr works out to about $16.58/mo.
2. **Show it per day.** "About 55¢ a day."
3. **Name what's included,** so the plan reads as service, not a fee: built-in 4G data, alerts by app/text/email, Waggle Vet, Waggle Vault and Waggle Places.

The prototype does all three on product cards, product pages, the plans page, the bundle builder, the cart and checkout.

**Why the Ring and Blink comparison is misleading:** their plans (roughly $3–5/mo, so check current pricing) cover cloud video storage on *your* WiFi. Waggle's plan *is* the internet connection, cellular data on three networks, plus the service suite. Product pages should say this in plain English. The "How it connects" section and the cellular-vs-WiFi guide do.

### 4.2 Lengthen the trial. **Decision**

The 4G camera plan trial is **3 days**. That's often shorter than the time it takes to receive, mount and first rely on the device, so customers pay before they've had a single "this saved me" moment.

- **Recommendation:** a 30-day trial. WaggleCam Pro already has a 30-day trial, and 30 days lines up with the 21-day return window.
- **Cost:** about one month of data per trial, which is likely small next to the hardware margin.
- **Test it:** A/B test 14 vs. 30 days, measuring trial-to-paid conversion, return rate and 90-day retention.
- **Also consider:** making yearly the default selection in the app.

### 4.3 Plan price consistency. **Ops**

Publish one price list. Support pages ($24.99/mo) and the subscription policy page ($29.99/mo) disagree.

---

## 5. Partner, referral, ambassador and Alpha programs

### 5.1 What's live today

| Program | Reward | Concern |
|---|---|---|
| Referral | **$50 to PayPal within 48 hours** per friend. "Friend saves 60% on every order." | Paid before the 21-day return window closes. Possibly more than hardware margin on a $99 device. |
| Ambassador (Explorer / Crew / Elite) | Perks, points, and **referral rewards** at Crew tier, plus Elite sponsorships | Ambassadors get a referral link too, so one person can earn through two programs. |
| Waggle Alpha | **Free welcome gift + free products to test + $250** for top feedback | Unbounded cost. "Trusted by 5,000+" claim is unverified. |
| Partner With Us | Pet Advocates, Resellers, Brands | Overlaps with the ambassador program. |

### 5.2 Questions for finance. **Decision**

- **How much is paid out each month?** Pull PayPal payout history (referrals), the referral app's report in the Shopify admin, Alpha's $250 rewards and free product cost (accounts payable plus zero-dollar Shopify orders), and ambassador perks and event costs.
- **What does a referred customer actually cost?** (Payouts + friend discount + free product + shipping) ÷ new customers from referral and ambassador links. Compare that with **Meta's cost per purchase** from Ads Manager.
- **Are referral customers incremental?** Many referred buyers would have bought anyway, so the true cost per *new* customer is higher than it looks.
- **The hypothesis to test:** moving part of this budget into Meta prospecting may acquire customers more cheaply and predictably.

### 5.3 Proposed structure. **Built** (as a proposal) / **Decision**

- **One Partners hub** with four clearly separate tracks: Refer a Friend · Ambassadors · Waggle Alpha · Business Partners.
- **Commission-based for new referrers:** a percentage of the friend's hardware subtotal (10% shown as a placeholder for finance to set). **Existing referrers are grandfathered** at the flat $50.
- **Rewards earned only after the 21-day return window closes AND the friend's required plan is active.**
- **Device purchase required.** Accessories alone don't qualify.
- **One link system, one reward per order.** Ambassadors use the same commission link, so there's no double-dipping. Tiers change perks, not payout.
- **Waggle Alpha is a product-feedback program, not a payout program.** The $250 reward isn't advertised in the redesign. Cap test units per quarter.
- **Shorter forms:** ask for name, email, how you travel and an optional link. Collect the address only after approval. Replace math captchas with a hidden honeypot field.
- **Drop the "friend saves 60%" claim** if 60% is just the sitewide sale price. Presenting a public discount as a referral perk is misleading pricing.

All program terms live in one config file (`src/lib/programs.ts`) so finance can change them without code changes to the page.

---

## 6. Events strategy. **Decision**

The 2026 roadmap is almost entirely RV shows and rallies (FRVA, Grand Design, Tiffin, Florida RV SuperShow, Alliance), plus one Police K-9 conference, and **all listed events were January–May 2026.** As of October, the events page is stale.

Recommendations:

1. **Add NASCAR race weekends.** Infield and campground crowds at races are some of the largest concentrations of RV owners anywhere, and they spend on their rigs. These should be a top priority.
2. **Add consumer pet expos and dog sports** (pet expos, agility, dock diving, dog shows). They reach home pet owners and support the move beyond RV.
3. **Add overlanding, camping and van-life shows.** They reach pet travelers who don't own RVs.
4. **Keep the strongest RV rallies,** but measure each event with event-specific codes and post-event sales. Reallocate to what converts.
5. **Keep the events page current:** show upcoming events only, and archive past ones automatically.

---

## 7. Reviews and social proof. **Ops** + **Built**

1. **Ask at the right moment:** send the review request about 14 days after plan activation, not after shipping. Add an in-app prompt after a "your pet is safe" moment.
2. **Combine reviews by product family** (all Pet Monitors on one page, all 4G cameras on one page).
3. **Use a proper review platform** (Judge.me, Okendo or Yotpo) with Google Shopping review syndication.
4. **Don't copy Amazon reviews onto the site.** Amazon's terms prohibit it. Link to the Amazon listing instead.
5. **Built:** the prototype shows only verified review counts (the RV 4G Mini Camera's 4.2 from 30 reviews), links independent press reviews, and attributes brand stats as "reported by Waggle." It shows no invented ratings and emits no review structured data until a real review feed is connected.

---

## 8. Content, SEO and AI search

### 8.1 Wag Reads. **Built**

- Hub at `/learn` with "View all" first, then RVing with Pets · Heatstroke in Pets · Pet Guides · Buying Guides · Waggle Live, plus links into the existing blog archive (mywaggle.com/pages/blogs).
- 8 new guides written **answer-first** for search engines and AI assistants: cellular vs. WiFi, heatstroke in pets, the RVing with pets checklist, monitoring without WiFi, why monitors need a subscription, power outages and pets home alone, choosing a pet camera, and road trips with dogs.
- Each guide has: a "Quick answer" an AI can quote, question-style headings, key takeaways, an FAQ with FAQPage structured data, Article structured data with dates, and links to the relevant products.
- `llms.txt` at the site root gives AI crawlers a plain-text map of products, plan pricing and guides.

### 8.2 Content plan (next 20 guides). **Decision**

Priorities are topics people ask AI assistants and search engines, where Waggle has a credible answer:

- How hot is too hot for a dog in an RV / car / house?
- Best pet monitor without WiFi (comparison)
- Is it legal to leave a dog in a car in [state]? (state-by-state series)
- RV AC failure: what to do when you're away
- Pet-friendly campgrounds and boondocking with pets
- Dog-safe temperature by breed (brachycephalic breeds, seniors)
- Cat heatstroke signs
- Leaving pets home during a power outage or heat wave
- Pet monitor vs. pet camera: do you need both?
- Cellular security cameras for cabins and remote property
- Ring and Blink vs. a cellular camera: what's the difference?
- First week with a Waggle: setup checklist
- Traveling with pets across the Canadian border
- Pet travel checklist (printable)
- How satellite backup alerts work
- Separation anxiety and cameras (with Waggle Live trainers)
- Hot car myths (cracked windows, shade)
- RV generator and shore power basics for pet owners
- Monitoring an elderly pet while at work
- Case studies: "Waggle Saves Lives" stories (with written consent)

### 8.3 Technical SEO. **Built**

Per-page titles, descriptions and canonical URLs · Organization, Product, BreadcrumbList, FAQPage and Article structured data · XML sitemap · robots.txt (cart, checkout, account and search excluded) · semantic HTML · descriptive alt text · statically prerendered category, product and guide pages.

### 8.4 Waggle Live. **Built**

Featured on the homepage and in Wag Reads, with a dedicated `/live` page listing past sessions, speakers' published credentials and a notify form. **Ops:** connect replay URLs (`src/lib/live.ts`) so "watch" links can go straight to video.

---

## 9. Analytics. **Built**

GA4 ecommerce events and custom events (quiz, compare, bundle, promotion) are wired through a single `track()` helper. **Demo orders fire `demo_purchase`, never `purchase`,** so prototype sessions can't inflate revenue. The full event dictionary is in `docs/analytics.md`.

KPIs to watch after launch: conversion rate by landing category, quiz start→complete→add-to-cart, attach rate (monitor + camera), average order value, trial-to-paid conversion, return rate by product, and cost per new customer by channel (Meta vs. referral vs. events).

---

## 10. Commerce architecture and launch path

- **Prototype:** Next.js 16, TypeScript and Tailwind CSS, with a typed catalog in `src/lib/catalog`, deployable to Vercel. Every price and spec records its source and verification status.
- **Commerce seam:** a `CommerceProvider` interface. The local demo provider can be swapped for the **Shopify Storefront API + Shopify Checkout** (fastest path, since Waggle is already on Shopify) or Stripe-hosted checkout. Card data never touches Waggle's servers.
- **Fees:** a custom storefront doesn't by itself remove Shopify transaction fees or payment processing fees. Those depend on the Shopify plan and payment provider chosen.
- **Before launch:**
  1. Resolve the data conflicts in section 2.2.
  2. Supply official product photography (each product has an `images` field ready for it).
  3. Connect the review provider.
  4. Connect the email platform.
  5. Connect Shopify.
  6. Set the GA4 measurement ID.

---

## 11. Decision log for leadership

| # | Decision | Recommendation |
|---|---|---|
| 1 | Adopt the broader positioning and navigation | Yes. Test the hero against one alternative headline. |
| 2 | Plan trial length | Test 14 vs. 30 days, with 30 as the target. |
| 3 | Plan pricing display | Yearly first, per-day framing, list what's included. |
| 4 | Referral program | Commission for new referrers, grandfather existing ones, pay after the return window. |
| 5 | Program consolidation | One Partners hub, one link system, no stacked rewards. |
| 6 | Waggle Alpha $250 rewards | Pause or cap pending a cost review. |
| 7 | Budget reallocation | Compare cost per new customer for programs vs. Meta, then shift budget to the cheaper channel. |
| 8 | Events | Add NASCAR, pet expos and overlanding. Measure each event. |
| 9 | Reviews | Adopt a review platform and post-activation requests. |
| 10 | Data cleanup | One source of truth for prices, specs and plans. |
