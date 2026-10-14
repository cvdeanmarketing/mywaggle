import type { Product } from "@/lib/catalog";
import type { Promotion } from "./promotions";

/**
 * The seam between the storefront UI and a commerce backend.
 *
 * `localProvider` serves the typed demo catalog. A production provider
 * (Shopify Storefront API, or Stripe + a product database) implements the
 * same interface; checkout then hands off to the provider's hosted or
 * tokenized payment flow. Card data never touches this application.
 */
export interface CheckoutLine {
  handle: string;
  variantId: string;
  quantity: number;
}

export interface CheckoutSession {
  id: string;
  /** Where to send the customer to pay. Demo mode returns an internal confirmation URL. */
  redirectUrl: string;
  mode: "demo" | "live";
}

export interface CommerceProvider {
  readonly name: string;
  listProducts(): Promise<Product[]>;
  getProduct(handle: string): Promise<Product | undefined>;
  validatePromotion(code: string): Promise<Promotion | undefined>;
  /**
   * Production: create a Shopify cart (cartCreate → checkoutUrl) or a Stripe
   * Checkout Session and return its hosted URL.
   */
  createCheckout(
    lines: CheckoutLine[],
    promoCode?: string,
  ): Promise<CheckoutSession>;
}
