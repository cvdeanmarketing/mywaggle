import type { Metadata } from "next";
import Link from "next/link";
import { searchProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/product/ProductCard";
import { PageHeader } from "@/components/shop/PageHeader";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const results = searchProducts(q);
  return (
    <>
      <PageHeader crumbs={[{ name: "Search", path: "/search" }]} title={q ? `Results for “${q}”` : "Search"} intro={q ? `${results.length} ${results.length === 1 ? "product" : "products"} found.` : undefined}>
        <form action="/search" role="search" className="mt-6 flex max-w-xl gap-2">
          <label htmlFor="q" className="sr-only">Search products</label>
          <input id="q" name="q" defaultValue={q} className="field" placeholder="Search monitors, cameras, no-WiFi…" />
          <button className="btn-primary">Search</button>
        </form>
      </PageHeader>
      <div className="container-page py-12">
        {results.length === 0 ? (
          <p className="text-muted">
            Nothing matched. Try <Link href="/find-your-waggle" className="link">Find Your Waggle</Link> or <Link href="/shop" className="link">browse everything</Link>.
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
