import type { Product } from "@/lib/catalog";
import { compareAtOf, priceOf } from "@/lib/catalog";
import { cn, money } from "@/lib/format";

export function Price({ product, size = "md", className }: { product: Product; size?: "sm" | "md" | "lg"; className?: string }) {
  const price = priceOf(product);
  const compareAt = compareAtOf(product);
  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className={cn("font-display font-semibold text-ink", size === "lg" ? "text-3xl" : size === "md" ? "text-lg" : "text-base")}>
        {money(price)}
      </span>
      {compareAt && compareAt > price && (
        <>
          <span className={cn("text-muted line-through", size === "lg" ? "text-lg" : "text-sm")}>
            <span className="sr-only">Was </span>
            {money(compareAt)}
          </span>
          {size !== "sm" && (
            <span className="rounded-full bg-clay-50 px-2 py-0.5 text-xs font-bold text-clay-700">Save {money(compareAt - price)}</span>
          )}
        </>
      )}
    </div>
  );
}
