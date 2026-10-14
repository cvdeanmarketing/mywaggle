import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory, productsInCategory, type CategorySlug } from "@/lib/catalog";
import { ARTICLES } from "@/lib/content/articles";
import { PageHeader } from "@/components/shop/PageHeader";
import { ShopGrid } from "@/components/shop/ShopGrid";

export function generateStaticParams() {
  return categories.filter((c) => c.slug !== "bundles").map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return { title: c.seoTitle, description: c.seoDescription, alternates: { canonical: `/shop/${c.slug}` } };
}

const GUIDES: Partial<Record<CategorySlug, string[]>> = {
  "pet-safety": ["pet-heat-safety", "pets-home-alone-power-outage"],
  "pet-cameras": ["choosing-a-pet-camera", "cellular-vs-wifi"],
  "travel-adventure": ["road-trips-with-dogs", "monitor-pets-without-wifi"],
  "home-property": ["pets-home-alone-power-outage", "choosing-a-pet-camera"],
  "rv-solutions": ["rving-with-pets", "pet-heat-safety"],
  "no-wifi": ["monitor-pets-without-wifi", "cellular-vs-wifi"],
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c || c.slug === "bundles") notFound();
  const list = productsInCategory(c.slug);
  const guides = (GUIDES[c.slug] ?? []).map((s) => ARTICLES.find((a) => a.slug === s)).filter(Boolean);

  return (
    <>
      <PageHeader crumbs={[{ name: "Shop All", path: "/shop" }, { name: c.navLabel, path: `/shop/${c.slug}` }]} eyebrow={c.name} title={c.headline} intro={c.description}>
        <ul className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
          {c.guidance.map((g) => (
            <li key={g} className="flex gap-2.5 rounded-2xl bg-paper p-4 text-sm leading-snug">
              <Check className="mt-0.5 size-4 shrink-0 text-mint" aria-hidden />
              {g}
            </li>
          ))}
        </ul>
      </PageHeader>
      <div className="container-page py-12">
        <ShopGrid handles={list.map((p) => p.handle)} listName={`category_${c.slug}`} />
      </div>
      {guides.length > 0 && (
        <section className="border-t border-line py-14" aria-labelledby="guides-title">
          <div className="container-page">
            <h2 id="guides-title" className="text-2xl font-semibold">Helpful guides</h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {guides.map((a) => (
                <li key={a!.slug}>
                  <Link href={`/learn/${a!.slug}`} className="group flex items-center justify-between gap-4 rounded-2xl border border-line p-5 hover:border-ink">
                    <span>
                      <span className="block font-bold">{a!.title}</span>
                      <span className="mt-1 block text-sm text-muted">{a!.description}</span>
                    </span>
                    <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
