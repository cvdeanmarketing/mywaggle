import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARTICLES, SECTIONS, type ArticleSection } from "@/lib/content/articles";
import { ArticleCard } from "@/components/learn/ArticleCard";
import { PageHeader } from "@/components/shop/PageHeader";

export function generateStaticParams() {
  return Object.keys(SECTIONS).map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  const s = SECTIONS[section as ArticleSection];
  if (!s) return {};
  return { title: `${s.name} | Wag Reads`, description: s.blurb, alternates: { canonical: `/learn/section/${section}` } };
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const s = SECTIONS[section as ArticleSection];
  if (!s) notFound();
  const list = ARTICLES.filter((a) => a.section === section);
  return (
    <>
      <PageHeader crumbs={[{ name: "Wag Reads", path: "/learn" }, { name: s.name, path: `/learn/section/${section}` }]} eyebrow="Wag Reads" title={s.name} intro={s.blurb} />
      <div className="container-page py-14">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => (
            <li key={a.slug}><ArticleCard a={a} /></li>
          ))}
        </ul>
      </div>
    </>
  );
}
