"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { priceOf } from "@/lib/catalog";
import { cn, money } from "@/lib/format";
import { ProductArt } from "@/components/product/ProductArt";
import { PlanLine } from "@/components/product/PlanLine";

export function CartLines({ compact, onNavigate }: { compact?: boolean; onNavigate?: () => void }) {
  const { detailed, setQuantity, remove } = useCart();
  return (
    <ul className="divide-y divide-line">
      {detailed.map(({ product, quantity, handle }) => (
        <li key={handle} className="flex gap-4 py-4">
          <Link href={`/products/${handle}`} onClick={onNavigate} className={cn("shrink-0 overflow-hidden rounded-xl bg-sand", compact ? "size-20" : "size-24")}>
            <ProductArt art={product.art} title="" className="size-full" />
          </Link>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link href={`/products/${handle}`} onClick={onNavigate} className="font-bold leading-snug hover:underline">
                  {product.name}
                </Link>
                {product.kind === "bundle" && <p className="text-xs text-muted">{product.tagline}</p>}
              </div>
              <p className="font-bold">{money(priceOf(product) * quantity)}</p>
            </div>
            <PlanLine product={product} className="mt-1" />
            <div className="mt-auto flex items-center justify-between pt-3">
              <div className="inline-flex items-center rounded-full border border-line" role="group" aria-label={`Quantity for ${product.name}`}>
                <button
                  type="button"
                  className="inline-flex size-8 items-center justify-center rounded-full hover:bg-sand"
                  onClick={() => setQuantity(handle, quantity - 1)}
                  aria-label={`Decrease quantity of ${product.name}`}
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold" aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  className="inline-flex size-8 items-center justify-center rounded-full hover:bg-sand disabled:opacity-40"
                  onClick={() => setQuantity(handle, quantity + 1)}
                  disabled={quantity >= 10}
                  aria-label={`Increase quantity of ${product.name}`}
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
              <button type="button" onClick={() => remove(handle)} className="inline-flex items-center gap-1 text-xs font-bold text-muted hover:text-ink">
                <Trash2 className="size-3.5" aria-hidden /> Remove
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
