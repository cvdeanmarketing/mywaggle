import { getProduct, type Product } from "@/lib/catalog";
import { cn } from "@/lib/format";
import { AddToCartButton } from "./AddToCartButton";
import { ConnectivityTags } from "./ConnectivityTag";
import { PlanLine } from "./PlanLine";
import { Price } from "./Price";
import { ProductMedia } from "./ProductMedia";
import { TrackedLink } from "./TrackedLink";

export function ProductCard({
  product,
  listName,
  index,
  className,
  priority,
}: {
  product: Product;
  listName: string;
  index: number;
  className?: string;
  priority?: boolean;
}) {
  const href = `/products/${product.handle}`;
  const stack =
    product.kind === "bundle"
      ? (product.includes ?? [])
          .map(getProduct)
          .filter((p): p is Product => Boolean(p))
      : undefined;
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <TrackedLink
        href={href}
        handle={product.handle}
        listName={listName}
        index={index}
        className="block"
        aria-label={product.name}
        tabIndex={-1}
      >
        <ProductMedia
          product={product}
          bundleStack={stack}
          priority={priority}
          reserveBadge={Boolean(product.badge)}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[4/3.4] transition-transform duration-500 ease-out group-hover:[&_svg]:scale-[1.03] [&_svg]:transition-transform [&_svg]:duration-500"
        />
      </TrackedLink>
      {product.badge && (
        <span className="absolute left-4 top-4 rounded-full bg-paper/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-signal shadow-sm">
          {product.badge}
        </span>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <ConnectivityTags connectivity={product.connectivity} />
        <div>
          <h3 className="text-lg font-semibold leading-snug">
            <TrackedLink
              href={href}
              handle={product.handle}
              listName={listName}
              index={index}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {product.name}
            </TrackedLink>
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {product.tagline}
          </p>
        </div>
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div className="min-w-0">
            <Price product={product} size="sm" />
            <PlanLine product={product} className="mt-1" />
          </div>
          <AddToCartButton
            handle={product.handle}
            compact
            label="Add"
            className="relative z-10 shrink-0"
          />
        </div>
      </div>
    </article>
  );
}
