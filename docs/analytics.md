# GA4 Ecommerce Tracking Plan

All events go through `track()` in `src/lib/analytics.ts`, which pushes to `window.dataLayer` (works with GTM or gtag.js). Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to load gtag.js. Without it, events still populate `dataLayer` and log to the console in development.

Ecommerce events push `{ ecommerce: null }` first (GA4's recommendation), then `{ event, ecommerce: { ...params } }`.

## Item shape

| Param | Source |
|---|---|
| `item_id` | product handle |
| `item_name` | product name |
| `item_brand` | `"Waggle"` |
| `item_category` | first category slug |
| `item_variant` | variant title |
| `price` | current price (USD) |
| `quantity` | quantity |
| `index`, `item_list_id`, `item_list_name` | list context where relevant |

## Ecommerce events

| Event | Fired when | Key params | Where |
|---|---|---|---|
| `view_item_list` | A product list renders | `item_list_id`, `item_list_name`, `items` | `ViewItemList` (home bestsellers, shop, categories, bundles) |
| `select_item` | Product card clicked | `item_list_name`, `items` | `TrackedLink`, quiz result |
| `view_item` | Product page viewed | `currency`, `value`, `items` | `PurchasePanel` |
| `add_to_cart` | Item added or quantity increased | `currency`, `value`, `items` | `cart.tsx` |
| `remove_from_cart` | Item removed or quantity decreased | `currency`, `value`, `items` | `cart.tsx` |
| `view_cart` | Cart drawer opened or /cart viewed | `currency`, `value`, `items` | `cart.tsx`, `/cart` |
| `begin_checkout` | Checkout loads with items | `currency`, `value`, `coupon`, `items` | `/checkout` |
| `add_shipping_info` | Shipping step completed | `currency`, `value`, `shipping_tier`, `items` | `/checkout` |
| `add_payment_info` | Payment step completed | `currency`, `value`, `payment_type`, `items` | `/checkout` |
| `purchase` | Order confirmed **in live mode only** | `transaction_id`, `currency`, `value`, `coupon`, `shipping`, `items` | `/checkout` |

**Demo safeguard:** while `NEXT_PUBLIC_COMMERCE_MODE=demo`, `track("purchase")` is rewritten to `demo_purchase`, so prototype orders never count as revenue. In production, fire `purchase` from the order-confirmation webhook or the Shopify thank-you page, not the client, to avoid duplicates.

## Custom events

| Event | Fired when | Params |
|---|---|---|
| `quiz_started` | First answer selected | `quiz_name`, `placement` (page/embedded) |
| `quiz_completed` | Fourth answer selected | `protect`, `where`, `priority`, `wifi`, `recommended_item`, `alternative_item` |
| `product_compared` | Comparison selection changes (2+ items) | `items_compared`, `item_count` |
| `bundle_created` | Bundle builder adds to cart | `bundle_items`, `bundle_size`, `matched_bundle`, `value`, `currency` |
| `promotion_viewed` | Offer modal shown | `promotion_id`, `promotion_name`, `creative_slot` |
| `promotion_applied` | Promo code applied | `promotion_id`, `promotion_name`, `items` |

## Recommended GA4 setup

1. Register custom dimensions for `placement`, `recommended_item`, `matched_bundle` and `promotion_id`.
2. Mark `purchase`, `quiz_completed` and `bundle_created` as key events.
3. Build funnels: `view_item → add_to_cart → begin_checkout → add_shipping_info → add_payment_info → purchase`, and `quiz_started → quiz_completed → add_to_cart`.
4. Exclude `demo_purchase` from revenue reporting (it carries no `ecommerce.purchase` semantics).
5. With Shopify Checkout, use Shopify's Customer Events (web pixel) for checkout-step events on Shopify-hosted pages, and keep this storefront's events for browse, quiz and cart.
