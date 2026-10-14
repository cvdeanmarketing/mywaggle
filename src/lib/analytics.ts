/**
 * GA4 ecommerce tracking. See docs/analytics.md for the event dictionary.
 *
 * Events are pushed to window.dataLayer (works with GTM or gtag.js). In
 * demo mode a completed order fires `demo_purchase`, never `purchase`, so
 * prototype sessions can't inflate revenue reports.
 */
import { getProduct, priceOf, type Product } from "@/lib/catalog";

export type EcommerceEvent =
  | "view_item_list"
  | "select_item"
  | "view_item"
  | "add_to_cart"
  | "remove_from_cart"
  | "view_cart"
  | "begin_checkout"
  | "add_shipping_info"
  | "add_payment_info"
  | "purchase";

export type CustomEvent =
  | "quiz_started"
  | "quiz_completed"
  | "product_compared"
  | "bundle_created"
  | "promotion_viewed"
  | "promotion_applied"
  | "demo_purchase";

export interface Ga4Item {
  item_id: string;
  item_name: string;
  item_brand: "Waggle";
  item_category?: string;
  item_variant?: string;
  price: number;
  quantity: number;
  index?: number;
  item_list_id?: string;
  item_list_name?: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function toGa4Item(p: Product, quantity = 1, extra: Partial<Ga4Item> = {}): Ga4Item {
  return {
    item_id: p.handle,
    item_name: p.name,
    item_brand: "Waggle",
    item_category: p.categories[0],
    item_variant: p.variants[0]?.title,
    price: priceOf(p),
    quantity,
    ...extra,
  };
}

export function itemsFromLines(lines: { handle: string; quantity: number }[]): Ga4Item[] {
  return lines.flatMap((l) => {
    const p = getProduct(l.handle);
    return p ? [toGa4Item(p, l.quantity)] : [];
  });
}

const IS_DEMO = (process.env.NEXT_PUBLIC_COMMERCE_MODE ?? "demo") === "demo";

export function track(event: EcommerceEvent | CustomEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  let name: string = event;
  if (event === "purchase" && IS_DEMO) name = "demo_purchase";
  const payload = { event: name, ...(params.items ? { ecommerce: { ...params } } : params) };
  window.dataLayer = window.dataLayer ?? [];
  // GA4 recommends clearing the previous ecommerce object before pushing a new one.
  if (params.items) window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push(payload);
  if (process.env.NODE_ENV !== "production") console.debug("[analytics]", payload);
}
