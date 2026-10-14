import type { Product } from "@/lib/catalog";
import { priceOf } from "@/lib/catalog";
import { cn, money } from "@/lib/format";

export function Price({ product, size = "md", className }: { product: Product; size?: "sm" | "md" | "lg"; className?: string }) {
  const price = priceOf(product);
  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className={cn("font-display font-semibold text-ink", size === "lg" ? "text-3xl" : size === "md" ? "text-lg" : "text-base")}>
        {money(price)}
      </span>
    </div>
  );
}
