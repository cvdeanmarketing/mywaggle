# Waggle Storefront (Redesign Prototype)

A conversion-focused, direct-to-consumer storefront that repositions Waggle as a connected pet safety brand: 4G temperature monitors, WiFi and cellular pet cameras, and RV solutions, all in one ecosystem.

> **Demo mode.** Checkout takes no payment and collects no card data. Analytics records `demo_purchase`, never `purchase`.

- Strategy, audit findings and recommendations: [`docs/strategy.md`](docs/strategy.md)
- GA4 event dictionary: [`docs/analytics.md`](docs/analytics.md)

## Technology

Next.js 16 (App Router, static prerendering) · React 19 · TypeScript · Tailwind CSS 4 · Motion for React · Lucide icons

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm run build && npm start
```

## Project structure

```
src/
  app/                    Routes (home, shop, categories, products, compare, quiz,
                          bundles, plans, cart, checkout, learn, live, partners,
                          sitemap.xml, robots.txt, llms.txt)
  components/             UI by area: layout, home, product, shop, cart, learn, ui, seo
  lib/
    catalog/              Typed product data layer (products, plans, categories, sources)
    commerce/             CommerceProvider interface, local demo provider, promotions
    content/              Wag Reads guides and FAQs
    recommend.ts          Find Your Waggle rules engine
    cart.tsx              Cart state (localStorage), plan disclosure totals
    analytics.ts          GA4 dataLayer tracking
    programs.ts           Referral, ambassador, Alpha and partner terms (pending finance review)
    live.ts               Waggle Live sessions
```

### Catalog data

`src/lib/catalog/products.ts` is the single source of product truth. Every price, plan and spec records a `status` (`verified`, `conflicting` or `unverified`) and its `sources`. Waggle's public pages disagree on several figures. Those are listed in `docs/strategy.md` §2.2 and in a collapsed "data sources" panel on each product page. Nothing is invented: unknown values are omitted or marked.

### Product imagery

Products currently render as vector illustrations modeled on the real devices (`ProductArt.tsx`). To use official photography, add entries to a product's `images` array. `ProductMedia` will show them automatically via `next/image` (`cdn.shopify.com` is already allowed in `next.config.ts`).

## Environment variables

Copy `.env.example` to `.env.local`.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and structured data (default `https://mywaggle.com`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 ID. Leave empty to disable gtag.js. |
| `NEXT_PUBLIC_COMMERCE_MODE` | `demo` (only mode implemented) |
| `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Reserved for the Shopify provider (not yet used) |

Never commit `.env.local` or credentials.

## Deploying to Vercel

1. Import the GitHub repo in Vercel (framework preset: Next.js, no build overrides needed).
2. Set the environment variables above for Production and Preview.
3. Deploy. Or from the CLI:

```bash
npm i -g vercel
vercel link
vercel env add NEXT_PUBLIC_SITE_URL
vercel --prod
```

Set `NEXT_PUBLIC_SITE_URL` to the preview domain for previews, or canonical URLs will point at mywaggle.com.

## Demo checkout limitations

- No payment processing, tax calculation, shipping rates, inventory or order creation.
- Promo codes are validated locally against codes publicly advertised on the live site (`src/lib/commerce/promotions.ts`).
- Subscription plans are disclosed but not sold. They are activated in the Waggle app.
- Email and partner forms validate and confirm locally without sending data.

## Production integration path

1. **Commerce:** implement `CommerceProvider` (`src/lib/commerce/provider.ts`) against the Shopify Storefront API: products from `products`/`collections`, cart via `cartCreate`/`cartLinesAdd`, and redirect to `cart.checkoutUrl` for Shopify Checkout. Alternatively use Stripe Checkout Sessions created in a route handler. Card data must stay on the provider's hosted or tokenized form.
2. **Fees:** a custom storefront doesn't by itself eliminate Shopify transaction fees or payment processing fees. Those depend on the Shopify plan and payment provider.
3. **Reviews:** connect a review provider (Judge.me, Okendo or Yotpo) and populate `product.reviews`. Only then add `aggregateRating` structured data.
4. **Email/CRM:** replace local form confirmation with route handlers posting to the ESP/CRM.
5. **Analytics:** set the GA4 ID. Fire `purchase` server-side from order webhooks (see `docs/analytics.md`).
6. **Content:** supply official photography, Waggle Live replay URLs (`src/lib/live.ts`) and the official logo SVG (`Logo.tsx`).
