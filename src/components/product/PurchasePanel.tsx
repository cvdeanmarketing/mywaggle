"use client";

import { Check, Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { priceOf, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { toGa4Item, track } from "@/lib/analytics";
import { cn, money } from "@/lib/format";

export function PurchasePanel({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const price = priceOf(product);

  useEffect(() => {
    track("view_item", { currency: "USD", value: price, items: [toGa4Item(product)] });
  }, [product, price]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowSticky(!e!.isIntersecting && e!.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onAdd = () => {
    add(product.handle, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <div ref={ref} className="flex gap-3">
        <div className="inline-flex items-center rounded-full border border-line" role="group" aria-label="Quantity">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="inline-flex size-12 items-center justify-center rounded-full hover:bg-sand" aria-label="Decrease quantity">
            <Minus className="size-4" />
          </button>
          <span className="w-8 text-center font-bold" aria-live="polite">{qty}</span>
          <button type="button" onClick={() => setQty((q) => Math.min(10, q + 1))} className="inline-flex size-12 items-center justify-center rounded-full hover:bg-sand" aria-label="Increase quantity">
            <Plus className="size-4" />
          </button>
        </div>
        <button type="button" onClick={onAdd} className="btn-primary flex-1 py-3.5 text-base">
          {added ? <Check className="size-5" aria-hidden /> : null}
          {added ? "Added to cart" : `Add to cart · ${money(price * qty)}`}
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 p-3 backdrop-blur transition-transform duration-300 lg:hidden",
          showSticky ? "translate-y-0" : "translate-y-full",
        )}
        aria-hidden={!showSticky}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{product.name}</p>
            <p className="text-sm">{money(price)}</p>
          </div>
          <button type="button" onClick={onAdd} tabIndex={showSticky ? 0 : -1} className="btn-primary shrink-0">
            {added ? "Added" : "Add to cart"}
          </button>
        </div>
      </div>
    </>
  );
}
