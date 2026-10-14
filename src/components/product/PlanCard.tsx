import { Check, Info } from "lucide-react";
import Link from "next/link";
import { getPlan, perDayLabel, planPricing, type Product } from "@/lib/catalog";
import { money } from "@/lib/format";

export function PlanCard({ product }: { product: Product }) {
  const plan = getPlan(product.planId);
  if (!plan) {
    return (
      <div className="rounded-2xl border border-line p-5">
        <p className="font-bold">No subscription listed</p>
        <p className="mt-1 text-sm text-muted">{product.connectivityNote}</p>
      </div>
    );
  }
  const { yearly, yearlyPerMonth, perDay, monthly } = planPricing(plan);
  const others = plan.options.filter((o) => o.interval !== "year" && o.interval !== "month");
  return (
    <div className="rounded-2xl border border-line bg-paper">
      <div className="flex items-start justify-between gap-4 border-b border-line p-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted">{plan.requirement === "required" ? "Plan required" : "Optional plan"}</p>
          <p className="mt-1 font-display text-lg font-semibold">{plan.name}</p>
        </div>
        {yearly ? (
          <div className="text-right">
            <p className="font-display text-2xl font-semibold">
              {money(yearly)}
              <span className="text-sm font-normal text-muted">/yr</span>
            </p>
            <p className="text-xs font-semibold text-signal-700">
              ≈ {money(yearlyPerMonth!)}/mo · {perDayLabel(perDay!)}
            </p>
          </div>
        ) : (
          <p className="text-right text-sm text-muted">Pricing confirmed at activation</p>
        )}
      </div>
      <div className="space-y-3 p-5 text-sm">
        <p className="text-muted">{plan.requirementNote}</p>
        {plan.includes.length > 0 && (
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {plan.includes.map((i) => (
              <li key={i} className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-mint" aria-hidden />
                {i}
              </li>
            ))}
          </ul>
        )}
        {(monthly || others.length > 0 || plan.trial) && (
          <p className="flex gap-2 rounded-xl bg-sand p-3 text-xs text-muted">
            <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            <span>
              {plan.trial ? `${plan.trial}. ` : ""}
              {monthly ? `Or ${money(monthly)} billed monthly. ` : ""}
              {others.map((o) => `${o.label}: ${money(o.price)} per ${o.interval}. `).join("")}
              Billed through the Waggle app after activation, not at checkout. Cancel anytime.
            </span>
          </p>
        )}
        <Link href="/plans" className="inline-block text-xs font-bold text-signal hover:underline">
          Compare all plans
        </Link>
      </div>
    </div>
  );
}
