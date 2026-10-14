"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { priceOf, type Product } from "@/lib/catalog";
import { cn, money } from "@/lib/format";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { ProductMedia } from "@/components/product/ProductMedia";
import { TrackedLink } from "@/components/product/TrackedLink";
import { ViewItemList } from "@/components/product/ViewItemList";

/** Horizontally scrolling product rail: four cards in view on desktop, scroll or arrows for the rest. */
export function ProductRail({ products, title, listName }: { products: Product[]; title: string; listName: string }) {
  const scroller = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const page = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section className="pb-16 pt-14 sm:pb-20 sm:pt-16" aria-labelledby="rail-title">
      <ViewItemList listName={listName} handles={products.map((p) => p.handle)} />
      <div className="container-page">
        <h2 id="rail-title" className="text-center text-3xl font-semibold sm:text-[36px]">{title}</h2>
      </div>
      <div className="container-page mt-10">
        <ul
          ref={scroller}
          className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-4 px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
          aria-label={title}
        >
          {products.map((p, i) => (
            <li key={p.handle} className="w-[72%] shrink-0 snap-start sm:w-[44%] lg:w-[calc((100%-4.5rem)/4)]">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper transition-shadow hover:shadow-[var(--shadow-lift)]">
                <ProductMedia
                  product={p}
                  priority={i < 4}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 44vw, 72vw"
                  className="aspect-[1/0.9] [&_svg]:transition-transform [&_svg]:duration-500 group-hover:[&_svg]:scale-[1.04]"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className={cn("text-[11px] font-bold uppercase tracking-[0.14em]", p.badge ? "text-clay-700" : "text-muted")}>
                    {p.badge ?? (p.connectivity.includes("wifi") ? "WiFi" : p.connectivity.includes("cellular") ? "Built-in 4G" : "No app needed")}
                  </p>
                  <h3 className="mt-1.5 text-lg font-semibold leading-snug">
                    <TrackedLink
                      href={`/products/${p.handle}`}
                      handle={p.handle}
                      listName={listName}
                      index={i}
                      className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                    >
                      {p.name}
                    </TrackedLink>
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{p.tagline}</p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <p className="font-display text-lg font-semibold">
                      {money(priceOf(p))}
                    </p>
                    <AddToCartButton handle={p.handle} compact label="Add" className="relative z-10" />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
      <div className="container-page mt-10 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => page(-1)}
          disabled={edge.start}
          className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-paper transition-colors hover:border-ink disabled:opacity-35"
          aria-label="Previous products"
        >
          <ChevronLeft className="size-5" />
        </button>
        <Link href="/shop" className="btn bg-clay px-8 py-3.5 text-base text-paper hover:bg-clay-700">
          View all Products
        </Link>
        <button
          type="button"
          onClick={() => page(1)}
          disabled={edge.end}
          className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-paper transition-colors hover:border-ink disabled:opacity-35"
          aria-label="More products"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </section>
  );
}
