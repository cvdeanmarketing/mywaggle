import { getProduct, products } from "@/lib/catalog";
import type { CommerceProvider } from "./provider";
import { findPromotion } from "./promotions";

/** Demo provider: local catalog, no payments, no network. */
export const localProvider: CommerceProvider = {
  name: "local-demo",
  async listProducts() {
    return products;
  },
  async getProduct(handle) {
    return getProduct(handle);
  },
  async validatePromotion(code) {
    return findPromotion(code);
  },
  async createCheckout() {
    const id = `DEMO-${Date.now().toString(36).toUpperCase()}`;
    return {
      id,
      redirectUrl: `/checkout/confirmation?order=${id}`,
      mode: "demo",
    };
  },
};

export const commerce: CommerceProvider = localProvider;
