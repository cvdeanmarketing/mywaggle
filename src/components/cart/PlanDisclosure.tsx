"use client";

import { Info } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";
import { perDayLabel, planPricing } from "@/lib/catalog";

/** Shows ongoing subscription costs before purchase. */
export function PlanDisclosure({ className }: { className?: string }) {
  const { totals } = useCart();
  if (totals.plans.length === 0) return null;
  return (
    <div className={className}>
      <div className="rounded-2xl border border-signal/20 bg-signal-50 p-4">
        <p className="flex items-center gap-2 text-sm font-bold text-ink">
          <Info className="size-4 text-signal" aria-hidden /> Ongoing plans after purchase
        </p>
        <ul className="mt-2 space-y-1.5 text-sm">
          {totals.plans.map(({ product, plan, quantity }) => {
            const { yearly: yv, yearlyPerMonth, perDay, monthly: mv } = planPricing(plan);
            return (
              <li key={product.handle} className="flex justify-between gap-3">
                <span className="text-muted">
                  {product.name}
                  {quantity > 1 ? ` ×${quantity}` : ""}: {plan.requirement === "required" ? "required" : "optional"}
                </span>
                <span className="shrink-0 text-right font-bold">
                  {yv ? `${money(yv)}/yr` : mv ? `${money(mv)}/mo` : "at activation"}
                  {yv && perDay ? (
                    <span className="block text-xs font-semibold text-signal">
                      ≈ {money(yearlyPerMonth!)}/mo · {perDayLabel(perDay)}
                      {mv ? ` · or ${money(mv)} monthly` : ""}
                    </span>
                  ) : null}
                </span>
              </li>
            );
          })}
        </ul>
        {totals.requiredYearly > 0 && (
          <p className="mt-3 border-t border-signal/15 pt-3 text-xs text-muted">
            Required plans from <strong className="text-ink">{money(totals.requiredYearly)}/yr</strong> total on yearly billing.
            {totals.hasUnpricedRequiredPlan ? " Some plan prices are confirmed at activation." : ""} Plans are billed separately through the
            Waggle app and are not charged at checkout. <Link href="/plans" className="link">Compare plans</Link>
          </p>
        )}
      </div>
    </div>
  );
}
