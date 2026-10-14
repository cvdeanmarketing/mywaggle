import type { Metadata } from "next";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { ARTICLES, BLOG_ARCHIVE_URL, LEGACY_POSTS, ORIGINAL_PAGES, SECTIONS, type ArticleSection } from "@/lib/content/articles";
import { ArticleCard } from "@/components/learn/ArticleCard";
import { PageHeader } from "@/components/shop/PageHeader";

export const metadata: Metadata = {
  title: "Wag Reads: Pet Safety, RV Travel & Buying Guides",
  description: "Straight answers on pet heat safety, RVing and road trips with pets, monitoring without WiFi, and choosing the right pet monitor or camera.",
  alternates: { canonical: "/learn" },
};

export default function LearnPage() {
  const [lead, ...rest] = ARTICLES;
  return (
    <>
      <PageHeader crumbs={[{ name: "Wag Reads", path: "/learn" }]} eyebrow="Wag Reads" title="Know more. Worry less." intro="Pet safety, travel know-how and buying guides from the Waggle team.">
        <nav aria-label="Wag Reads sections" className="mt-8 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Link href="/learn" className="chip shrink-0 border-ink bg-ink px-4 py-2 text-sm text-paper">All guides</Link>
          {(Object.keys(SECTIONS) as ArticleSection[]).map((s) => (
            <Link key={s} href={`/learn/section/${s}`} className="chip shrink-0 px-4 py-2 text-sm hover:border-ink">{SECTIONS[s].name}</Link>
          ))}
          <Link href="/live" className="chip shrink-0 px-4 py-2 text-sm hover:border-ink">Waggle Live</Link>
          {ORIGINAL_PAGES.map((o) => (
            <a key={o.url + o.label} href={o.url} target="_blank" rel="noopener noreferrer" className="chip shrink-0 px-4 py-2 text-sm hover:border-ink">
              {o.label} <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
        </nav>
      </PageHeader>
      <div className="container-page py-14">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <ArticleCard a={lead!} large />
          <div className="grid gap-4">
            {rest.slice(0, 2).map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>
        </div>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(2).map((a) => (
            <li key={a.slug}><ArticleCard a={a} /></li>
          ))}
        </ul>

        <section className="mt-16 grid gap-6 lg:grid-cols-2" aria-label="More from Waggle">
          <Link href="/live" className="group flex items-center justify-between gap-6 rounded-[var(--radius-card)] bg-ink p-8 text-paper">
            <span>
              <span className="eyebrow text-clay">Pet Travel Videos</span>
              <span className="mt-2 block font-display text-2xl font-semibold">Waggle Live expert sessions</span>
              <span className="mt-1 block text-sm text-muted-dark">Vets, trainers and full-time RVers answer your questions.</span>
            </span>
            <PlayCircle className="size-10 shrink-0 text-clay transition-transform group-hover:scale-110" aria-hidden />
          </Link>
          <div className="rounded-[var(--radius-card)] border border-line p-8">
            <p className="eyebrow">From the blog archive</p>
            <ul className="mt-4 space-y-3">
              {LEGACY_POSTS.map((p) => (
                <li key={p.url}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-start justify-between gap-4 font-bold hover:text-signal">
                    {p.title} <ArrowUpRight className="mt-1 size-4 shrink-0" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            <a href={BLOG_ARCHIVE_URL} target="_blank" rel="noopener noreferrer" className="link mt-5 inline-block text-sm">Browse all Wag Reads posts</a>
          </div>
        </section>
      </div>
    </>
  );
}
