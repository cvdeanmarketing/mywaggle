"use client";

import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";

export function OrderSummary() {
  const { totals } = useCart();
  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="font-bold">{money(totals.subtotal)}</dd></div>
      {totals.compareAtSavings > 0 && (
        <div className="flex justify-between text-muted"><dt>You save vs. list price</dt><dd>{money(totals.compareAtSavings)}</dd></div>
      )}
      {totals.discount > 0 && (
        <div className="flex justify-between text-mint"><dt>{totals.promotion?.label} ({totals.promotion?.code})</dt><dd className="font-bold">−{money(totals.discount)}</dd></div>
      )}
      <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd className="font-bold">Free</dd></div>
      <div className="flex justify-between"><dt className="text-muted">Tax</dt><dd className="text-muted">Calculated at payment</dd></div>
      <div className="flex justify-between border-t border-line pt-3 text-base"><dt className="font-bold">Total today</dt><dd className="font-display text-xl font-semibold">{money(totals.total)}</dd></div>
    </dl>
  );
}
