"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { PromoModal } from "./PromoModal";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
      <PromoModal />
    </CartProvider>
  );
}
