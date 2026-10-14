import type { Metadata } from "next";
import Link from "next/link";
import { categories, products } from "@/lib/catalog";
import { PageHeader } from "@/components/shop/PageHeader";
import { ShopGrid } from "@/components/shop/ShopGrid";

export const metadata: Metadata = {
  title: "Shop All Pet Monitors, Cameras & Bundles",
  description: "Shop Waggle 4G pet temperature monitors, WiFi and cellular pet cameras, RV solutions and bundles. Plan pricing shown up front.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  const handles = products.slice().sort((a, b) => a.merchRank - b.merchRank).map((p) => p.handle);
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Shop All", path: "/shop" }]}
        eyebrow="Shop all"
        title="Every Waggle, in one place."
        intro="Monitors that work without WiFi, cameras for home and the road, and bundles that bring them together in one app."
      >
        <nav aria-label="Categories" className="mt-8 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <Link key={c.slug} href={c.slug === "bundles" ? "/bundles" : `/shop/${c.slug}`} className="chip shrink-0 px-4 py-2 text-sm hover:border-ink">
              {c.navLabel}
            </Link>
          ))}
        </nav>
      </PageHeader>
      <div className="container-page py-12">
        <ShopGrid handles={handles} listName="shop_all" />
      </div>
    </>
  );
}
