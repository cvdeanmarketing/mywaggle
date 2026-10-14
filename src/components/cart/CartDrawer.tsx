"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { getProduct, priceOf, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";
import { ProductArt } from "@/components/product/ProductArt";
import { CartLines } from "./CartLines";
import { PlanDisclosure } from "./PlanDisclosure";

function crossSells(handles: string[]): Product[] {
  const inCart = new Set(handles);
  const seen = new Set<string>();
  const out: Product[] = [];
  for (const h of handles) {
    for (const r of getProduct(h)?.related ?? []) {
      if (inCart.has(r) || seen.has(r)) continue;
      const p = getProduct(r);
      if (p) {
        seen.add(r);
        out.push(p);
      }
    }
  }
  return out.slice(0, 3);
}

export function CartDrawer() {
  const { isOpen, close, detailed, totals, add } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [isOpen, close]);

  const recs = crossSells(detailed.map((d) => d.handle));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={close}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-paper outline-none"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex h-16 items-center justify-between border-b border-line px-5">
              <p className="font-display text-lg font-semibold">
                Your cart{" "}
                <span className="text-muted">({totals.itemCount})</span>
              </p>
              <button
                type="button"
                onClick={close}
                className="inline-flex size-10 items-center justify-center rounded-full hover:bg-sand"
                aria-label="Close cart"
              >
                <X className="size-5" />
              </button>
            </div>

            {detailed.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-sand">
                  <ShoppingBag className="size-6" aria-hidden />
                </span>
                <p className="font-display text-xl font-semibold">
                  Your cart is empty
                </p>
                <p className="text-sm text-muted">
                  Not sure what fits? Answer four quick questions and we&apos;ll
                  recommend a setup.
                </p>
                <Link
                  href="/find-your-waggle"
                  onClick={close}
                  className="btn-primary"
                >
                  Find Your Waggle
                </Link>
                <Link
                  href="/shop"
                  onClick={close}
                  className="text-sm font-bold text-signal"
                >
                  Shop all products
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5">
                  <CartLines compact onNavigate={close} />
                  <PlanDisclosure className="pb-4" />
                  {recs.length > 0 && (
                    <section
                      className="border-t border-line py-5"
                      aria-labelledby="pair-heading"
                    >
                      <h2 id="pair-heading" className="text-sm font-bold">
                        Works well with
                      </h2>
                      <ul className="mt-3 space-y-2">
                        {recs.map((p) => (
                          <li
                            key={p.handle}
                            className="flex items-center gap-3 rounded-2xl bg-sand p-2 pr-3"
                          >
                            <span className="size-14 shrink-0 overflow-hidden rounded-xl bg-paper">
                              <ProductArt
                                art={p.art}
                                title=""
                                className="size-full"
                              />
                            </span>
                            <span className="min-w-0 flex-1">
                              <Link
                                href={`/products/${p.handle}`}
                                onClick={close}
                                className="block truncate text-sm font-bold hover:underline"
                              >
                                {p.name}
                              </Link>
                              <span className="text-xs text-muted">
                                {money(priceOf(p))}
                              </span>
                            </span>
                            <button
                              type="button"
                              onClick={() => add(p.handle, 1, { silent: true })}
                              className="rounded-full bg-paper px-3 py-1.5 text-xs font-bold hover:bg-ink hover:text-paper"
                            >
                              Add
                            </button>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>
                <div className="border-t border-line bg-paper p-5">
                  <dl className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted">Subtotal</dt>
                      <dd className="font-bold">{money(totals.subtotal)}</dd>
                    </div>
                    {totals.discount > 0 && (
                      <div className="flex justify-between text-mint">
                        <dt>{totals.promotion?.label}</dt>
                        <dd className="font-bold">−{money(totals.discount)}</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-muted">Shipping</dt>
                      <dd className="font-bold">Free</dd>
                    </div>
                  </dl>
                  <Link
                    href="/checkout"
                    onClick={close}
                    className="btn-primary mt-4 w-full"
                  >
                    Checkout · {money(totals.total)}{" "}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                  <Link
                    href="/cart"
                    onClick={close}
                    className="mt-2 block text-center text-sm font-bold text-muted hover:text-ink"
                  >
                    View full cart
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
