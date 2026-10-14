import type { Metadata } from "next";
import { bundles } from "@/lib/catalog";
import { ProductCard } from "@/components/product/ProductCard";
import { ViewItemList } from "@/components/product/ViewItemList";
import { CategoryHero, HERO_THEMES } from "@/components/shop/CategoryHero";
import { BundleBuilder } from "@/components/shop/BundleBuilder";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Waggle Bundles & Bundle Builder",
  description:
    "Pair a Waggle 4G temperature monitor with a WiFi or 4G camera. Shop published bundles or build your own, with plan costs shown before checkout.",
  alternates: { canonical: "/bundles" },
};

export default function BundlesPage() {
  const list = bundles();
  return (
    <>
      <CategoryHero
        theme={HERO_THEMES.bundles!}
        crumbs={[{ name: "Bundles", path: "/bundles" }]}
        eyebrow="Bundles"
        title="Better together."
        intro="A monitor watches conditions. A camera shows you what's happening. Together, in one app, they cover both."
      />
      <section
        id="published"
        className="container-page py-14"
        aria-labelledby="pub-title"
      >
        <SectionHeading
          id="pub-title"
          title="Published bundles"
          intro="Waggle's current bundle pricing. Each cellular device in a bundle needs its own plan."
        />
        <ViewItemList listName="bundles" handles={list.map((b) => b.handle)} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((b, i) => (
            <li key={b.handle}>
              <ProductCard
                product={b}
                listName="bundles"
                index={i}
                className="h-full"
              />
            </li>
          ))}
        </ul>
      </section>
      <section
        id="build-a-bundle"
        className="scroll-mt-28 border-t border-line bg-sand py-14 sm:py-20"
        aria-labelledby="build-title"
      >
        <div className="container-page">
          <SectionHeading
            id="build-title"
            eyebrow="Bundle builder"
            title="Build your own."
            intro="Choose any combination. If it matches a published bundle, the bundle price applies. Otherwise you pay individual prices, with no surprises at checkout."
          />
          <div className="mt-10">
            <BundleBuilder />
          </div>
        </div>
      </section>
    </>
  );
}
