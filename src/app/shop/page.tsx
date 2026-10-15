import type { Metadata } from "next";
import Link from "next/link";
import {
  bundles,
  categories,
  getProduct,
  priceOf,
  products,
} from "@/lib/catalog";
import { BundleHero } from "@/components/shop/BundleHero";
import { PageHeader } from "@/components/shop/PageHeader";
import { ShopGrid } from "@/components/shop/ShopGrid";

export const metadata: Metadata = {
  title: "Shop All Pet Monitors, Cameras & Bundles",
  description:
    "Shop Waggle 4G pet temperature monitors, WiFi and cellular pet cameras, RV solutions and bundles. Plan pricing shown up front.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  const handles = products
    .slice()
    .sort((a, b) => a.merchRank - b.merchRank)
    .map((p) => p.handle);
  // Biggest saving across published bundles: sum of the included devices minus the bundle price.
  const maxSaving = Math.max(
    0,
    ...bundles().map((b) => {
      const parts = (b.includes ?? [])
        .map(getProduct)
        .filter((p): p is NonNullable<typeof p> => Boolean(p));
      return Math.round(
        parts.reduce((sum, p) => sum + priceOf(p), 0) - priceOf(b),
      );
    }),
  );
  return (
    <>
      <BundleHero maxSaving={maxSaving} />
      <PageHeader
        crumbs={[{ name: "Shop All", path: "/shop" }]}
        eyebrow="Shop all"
        title="Every Waggle, in one place."
        intro="Monitors that work without WiFi, cameras for home and the road, and bundles that bring them together in one app."
      >
        <nav
          aria-label="Categories"
          className="mt-8 flex flex-wrap gap-2 max-lg:justify-center"
        >
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={c.slug === "bundles" ? "/bundles" : `/shop/${c.slug}`}
              className="chip px-4 py-2 text-sm hover:border-ink"
            >
              {c.navLabel}
            </Link>
          ))}
        </nav>
      </PageHeader>
      <div id="all-products" className="container-page scroll-mt-32 py-12">
        <ShopGrid handles={handles} listName="shop_all" />
      </div>
    </>
  );
}
