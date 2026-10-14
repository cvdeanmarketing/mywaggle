"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { searchProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/product/ProductCard";
import { PageHeader } from "@/components/shop/PageHeader";

/** Client-side search so the page also works in a static export. */
export function SearchResults() {
  const q = useSearchParams().get("q") ?? "";
  const results = searchProducts(q);
  return (
    <>
      <PageHeader crumbs={[{ name: "Search", path: "/search" }]} title={q ? `Results for “${q}”` : "Search"} intro={q ? `${results.length} ${results.length === 1 ? "product" : "products"} found.` : undefined}>
        <form action="/search" role="search" className="mt-6 flex max-w-xl gap-2">
          <label htmlFor="q" className="sr-only">Search products</label>
          <input id="q" name="q" defaultValue={q} key={q} className="field" placeholder="Search monitors, cameras, no-WiFi…" />
          <button className="btn-primary">Search</button>
        </form>
      </PageHeader>
      <div className="container-page py-12">
        {results.length === 0 ? (
          <p className="text-muted">
            {q ? "Nothing matched. Try " : "Search for a product, or try "}
            <Link href="/find-your-waggle" className="link">Find Your Waggle</Link> or <Link href="/shop" className="link">browse everything</Link>.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p, i) => (
              <li key={p.handle}>
                <ProductCard product={p} listName="search_results" index={i} className="h-full" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
