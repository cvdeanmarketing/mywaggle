import { getPlan, perDayLabel, planPricing, type Product } from "@/lib/catalog";
import { cn, money } from "@/lib/format";

/** One-line subscription disclosure for cards: yearly first, then per day. */
export function PlanLine({ product, className }: { product: Product; className?: string }) {
  const plan = getPlan(product.planId);
  if (product.kind === "bundle") {
    return <p className={cn("text-xs text-muted", className)}>One plan per cellular device. See details.</p>;
  }
  if (!plan) return <p className={cn("text-xs text-muted", className)}>No subscription listed</p>;
  const { yearly, perDay } = planPricing(plan);
  if (plan.requirement === "optional") {
    return <p className={cn("text-xs text-muted", className)}>Optional cloud plan{yearly ? ` · ${money(yearly)}/yr` : ""}</p>;
  }
  return (
    <p className={cn("text-xs text-muted", className)}>
      <span className="font-bold text-ink">Plan:</span> {yearly ? <>{money(yearly)}/yr{perDay ? <span className="font-semibold text-signal"> · {perDayLabel(perDay)}</span> : null}</> : "price at activation"}
    </p>
  );
}
