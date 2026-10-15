import type { Metadata } from "next";
import { Check } from "lucide-react";
import { notFound } from "next/navigation";
import { getProduct, type Product } from "@/lib/catalog";
import { ARTICLES, SECTIONS, getArticle } from "@/lib/content/articles";
import { absoluteUrl } from "@/lib/site";
import { ArticleCard } from "@/components/learn/ArticleCard";
import { ProductCard } from "@/components/product/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/ui/Faq";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/learn/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.description,
      modifiedTime: a.updated,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const products = a.products
    .map(getProduct)
    .filter((p): p is Product => Boolean(p));
  const more = ARTICLES.filter(
    (x) =>
      x.slug !== a.slug &&
      (x.section === a.section ||
        x.products.some((p) => a.products.includes(p))),
  ).slice(0, 3);
  const updated = new Date(a.updated).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article>
      <header className="bg-sand">
        <div className="container-page max-w-3xl pb-12 pt-6">
          <Breadcrumbs
            items={[
              { name: "Wag Reads", path: "/learn" },
              {
                name: SECTIONS[a.section].name,
                path: `/learn/section/${a.section}`,
              },
              { name: a.title, path: `/learn/${a.slug}` },
            ]}
          />
          <p className="eyebrow mt-10">{SECTIONS[a.section].name}</p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.08] sm:text-5xl">
            {a.title}
          </h1>
          <p className="mt-4 text-sm text-muted">
            By the Waggle team · Updated{" "}
            <time dateTime={a.updated}>{updated}</time> · {a.readMinutes} min
            read
          </p>
        </div>
      </header>

      <div className="container-page max-w-3xl py-12">
        <section
          aria-labelledby="quick-answer"
          className="rounded-2xl border-l-4 border-clay bg-clay-50 p-6"
        >
          <h2
            id="quick-answer"
            className="text-sm font-bold uppercase tracking-wider text-clay-700"
          >
            Quick answer
          </h2>
          <p className="mt-2 text-lg leading-relaxed">{a.quickAnswer}</p>
        </section>

        <div className="mt-10 space-y-10">
          {a.blocks.map((b) => (
            <section key={b.heading}>
              <h2 className="text-2xl font-semibold">{b.heading}</h2>
              {b.paragraphs?.map((p) => (
                <p
                  key={p}
                  className="mt-4 text-[17px] leading-relaxed text-ink/85"
                >
                  {p}
                </p>
              ))}
              {b.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {b.bullets.map((x) => (
                    <li
                      key={x}
                      className="flex gap-3 text-[17px] leading-relaxed text-ink/85"
                    >
                      <span
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-clay"
                        aria-hidden
                      />
                      {x}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section
          aria-labelledby="takeaways"
          className="mt-12 rounded-2xl bg-sand p-6"
        >
          <h2 id="takeaways" className="text-xl font-semibold">
            Key takeaways
          </h2>
          <ul className="mt-4 space-y-2">
            {a.takeaways.map((t) => (
              <li key={t} className="flex gap-2.5">
                <Check className="mt-1 size-4 shrink-0 text-mint" aria-hidden />{" "}
                {t}
              </li>
            ))}
          </ul>
        </section>

        {a.section === "heatstroke" && (
          <p className="mt-6 text-sm text-muted">
            This guide is general information, not veterinary advice. If you
            think your pet is overheating, contact a veterinarian immediately.
          </p>
        )}

        <section className="mt-14" aria-labelledby="afaq">
          <h2 id="afaq" className="text-2xl font-semibold">
            Frequently asked questions
          </h2>
          <div className="mt-4">
            <Faq items={a.faqs} withSchema />
          </div>
        </section>
      </div>

      {products.length > 0 && (
        <section
          className="border-t border-line bg-sand py-14"
          aria-labelledby="art-products"
        >
          <div className="container-page">
            <h2 id="art-products" className="text-2xl font-semibold">
              Products mentioned in this guide
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p, i) => (
                <li key={p.handle}>
                  <ProductCard
                    product={p}
                    listName={`article_${a.slug}`}
                    index={i}
                    className="h-full"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section className="py-14" aria-labelledby="more-reads">
          <div className="container-page">
            <h2 id="more-reads" className="text-2xl font-semibold">
              Keep reading
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {more.map((m) => (
                <li key={m.slug}>
                  <ArticleCard a={m} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.description,
          dateModified: a.updated,
          datePublished: a.updated,
          author: { "@type": "Organization", name: "Waggle" },
          publisher: {
            "@type": "Organization",
            name: "Waggle",
            logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") },
          },
          mainEntityOfPage: absoluteUrl(`/learn/${a.slug}`),
          abstract: a.quickAnswer,
        }}
      />
    </article>
  );
}
