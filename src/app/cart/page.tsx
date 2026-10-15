"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { itemsFromLines, track } from "@/lib/analytics";
import { CartLines } from "@/components/cart/CartLines";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { PlanDisclosure } from "@/components/cart/PlanDisclosure";
import { PromoField } from "@/components/cart/PromoField";

export default function CartPage() {
  const { detailed, totals, lines } = useCart();
  useEffect(() => {
    if (lines.length)
      track("view_cart", {
        currency: "USD",
        value: totals.total,
        items: itemsFromLines(lines),
      });
    // fire once on load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="text-4xl font-semibold">Your cart</h1>
      {detailed.length === 0 ? (
        <div className="mt-10 rounded-[var(--radius-card)] bg-sand p-10 text-center">
          <p className="font-display text-2xl font-semibold">
            Your cart is empty.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/find-your-waggle" className="btn-primary">
              Find Your Waggle
            </Link>
            <Link href="/shop" className="btn-secondary">
              Shop all products
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <CartLines />
            <PlanDisclosure className="mt-4" />
          </div>
          <aside className="lg:sticky lg:top-36 lg:self-start">
            <div className="rounded-[var(--radius-card)] border border-line p-6">
              <h2 className="font-display text-xl font-semibold">
                Order summary
              </h2>
              <div className="mt-5">
                <PromoField />
              </div>
              <div className="mt-6">
                <OrderSummary />
              </div>
              <Link href="/checkout" className="btn-primary mt-6 w-full py-3.5">
                Checkout <ArrowRight className="size-4" aria-hidden />
              </Link>
              <p className="mt-3 text-center text-xs text-muted">
                Free shipping · 21-day returns · {totals.itemCount}{" "}
                {totals.itemCount === 1 ? "item" : "items"}
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
