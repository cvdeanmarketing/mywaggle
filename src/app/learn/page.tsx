/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Clock, PlayCircle } from "lucide-react";
import Link from "next/link";
import {
  ARTICLES,
  SECTIONS,
  type ArticleSection,
} from "@/lib/content/articles";
import { HUB_POSTS, HUB_SECTIONS, type HubPost } from "@/lib/content/blog-hub";
import { ArticleCard } from "@/components/learn/ArticleCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "The Waggle Blog: RV Tips, Pet Safety & Expert Guides",
  description:
    "From campground picks to vet-backed pet health guides: everything that makes RV life better for you and your animals, in one place.",
  alternates: { canonical: "/learn" },
};

function Meta({ p, light }: { p: HubPost; light?: boolean }) {
  return (
    <p
      className={`flex items-center gap-1.5 text-xs ${light ? "text-white/75" : "text-muted"}`}
    >
      <Clock className="size-3.5" aria-hidden />
      {p.mins ? `${p.mins} min read` : null}
      {p.date ? <> · {p.date}</> : null}
    </p>
  );
}

function Featured({ p }: { p: HubPost }) {
  return (
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid overflow-hidden rounded-3xl border border-line bg-paper shadow-sm transition-shadow hover:shadow-[var(--shadow-lift)] md:grid-cols-[1.1fr_1fr]"
    >
      <div className="aspect-[16/10] overflow-hidden bg-sand md:aspect-auto">
        {p.img && (
          <img
            src={p.img}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
        {p.tag && (
          <span className="w-fit rounded-full bg-signal-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-signal">
            {p.tag}
          </span>
        )}
        <h3 className="text-2xl font-semibold leading-snug">{p.title}</h3>
        {p.desc && (
          <p className="text-sm leading-relaxed text-muted">{p.desc}</p>
        )}
        <Meta p={p} />
        <span className="inline-flex items-center gap-1 text-sm font-bold text-signal">
          Read the full guide{" "}
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
          <span className="sr-only">(opens in a new tab)</span>
        </span>
      </div>
    </a>
  );
}

function Small({ p }: { p: HubPost }) {
  return (
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-shadow hover:shadow-[var(--shadow-lift)]"
    >
      <div className="aspect-[16/10] overflow-hidden bg-sand">
        {p.img && (
          <img
            src={p.img}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {p.tag && (
          <span className="text-[11px] font-bold uppercase tracking-wider text-clay-700">
            {p.tag}
          </span>
        )}
        <h4 className="text-base font-semibold leading-snug">{p.title}</h4>
        <div className="mt-auto pt-1">
          <Meta p={p} />
        </div>
        <span className="sr-only">(opens in a new tab)</span>
      </div>
    </a>
  );
}

export default function LearnPage() {
  const latest = HUB_POSTS.filter((p) => p.section === "all");
  const [latestLead, ...latestRest] = latest;
  const [lead, ...rest] = ARTICLES;
  return (
    <>
      <header className="bg-sand">
        <div className="container-page pb-12 pt-8 sm:pb-16">
          <Breadcrumbs items={[{ name: "Wag Reads", path: "/learn" }]} />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="eyebrow text-signal">The Waggle Blog</p>
              <h1 className="mt-3 text-4xl font-semibold leading-[1.05] sm:text-[52px]">
                RV Tips, Pet Safety &amp; Expert Guides for Life on the Road
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                From campground picks to vet-backed pet health guides —
                everything that makes RV life better for you and your animals,
                in one place.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/learn/section/rving-with-pets"
                  className="btn-primary px-6 py-3"
                >
                  RVing with Pets <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link
                  href="/learn/section/heatstroke"
                  className="inline-flex items-center rounded-full border border-ink/20 bg-paper px-6 py-3 text-sm font-bold hover:border-ink"
                >
                  Heatstroke guide
                </Link>
              </div>
            </div>
            <img
              src="/images/blog/banner.webp"
              alt="Dog looking out of an RV window with mountains and a camper behind"
              className="mx-auto w-full max-w-lg rounded-[2rem] shadow-[var(--shadow-lift)]"
            />
          </div>
        </div>
        <nav
          aria-label="Blog topics"
          className="border-t border-ink/10 bg-paper/70 backdrop-blur"
        >
          <ul className="container-page flex gap-2 overflow-x-auto py-3 scrollbar-none">
            {HUB_SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="chip shrink-0 px-4 py-2 text-sm hover:border-ink"
                >
                  {s.name}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/videos"
                className="chip shrink-0 px-4 py-2 text-sm hover:border-ink"
              >
                Pet Travel Videos
              </Link>
            </li>
            <li>
              <Link
                href="/live"
                className="chip shrink-0 px-4 py-2 text-sm hover:border-ink"
              >
                Waggle Live
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="container-page space-y-16 py-14 sm:space-y-20 sm:py-16">
        {HUB_SECTIONS.map((s) => {
          const items = HUB_POSTS.filter((p) => p.section === s.id);
          const [f, ...others] = items;
          if (!f) return null;
          return (
            <section
              key={s.id}
              id={s.id}
              className="scroll-mt-40"
              aria-labelledby={`${s.id}-t`}
            >
              <div className="mb-6 flex items-end justify-between gap-4">
                <h2 id={`${s.id}-t`} className="text-3xl font-semibold">
                  {s.name}
                </h2>
              </div>
              <Featured p={f} />
              <ul
                className={`mt-4 grid gap-4 sm:grid-cols-2 ${others.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}
              >
                {others.map((p) => (
                  <li key={p.slug}>
                    <Small p={p} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {latestLead && (
        <section
          className="bg-ink py-14 text-white sm:py-16"
          aria-labelledby="latest-t"
        >
          <div className="container-page">
            <p className="eyebrow text-signal">Fresh from the blog</p>
            <h2
              id="latest-t"
              className="mt-2 text-3xl font-semibold sm:text-4xl"
            >
              Latest from Waggle
            </h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
              <a
                href={latestLead.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative isolate flex min-h-[22rem] items-end overflow-hidden rounded-3xl p-7"
              >
                {latestLead.img && (
                  <img
                    src={latestLead.img}
                    alt=""
                    className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <span className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                <span>
                  <span className="text-xs text-white/75">
                    {latestLead.date}
                  </span>
                  <span className="mt-1 block font-display text-3xl font-semibold leading-tight">
                    {latestLead.title}
                  </span>
                  <span className="mt-2 block">
                    <Meta p={{ ...latestLead, date: null }} light />
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {latestRest.slice(0, 2).map((p) => (
                  <li key={p.slug}>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex gap-4 rounded-2xl bg-white/10 p-4 transition-colors hover:bg-white/15"
                    >
                      {p.img && (
                        <img
                          src={p.img}
                          alt=""
                          loading="lazy"
                          className="size-24 shrink-0 rounded-xl object-cover"
                        />
                      )}
                      <span>
                        <span className="block font-display text-lg font-semibold leading-snug">
                          {p.title}
                        </span>
                        <span className="mt-2 block">
                          <Meta p={p} light />
                        </span>
                        <span className="sr-only">(opens in a new tab)</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="mt-5 grid gap-4 sm:grid-cols-3">
              {latestRest.slice(2).map((p) => (
                <li key={p.slug}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-2xl bg-white/10 transition-colors hover:bg-white/15"
                  >
                    {p.img && (
                      <img
                        src={p.img}
                        alt=""
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover"
                      />
                    )}
                    <span className="block p-4">
                      <span className="block font-display text-base font-semibold leading-snug">
                        {p.title}
                      </span>
                      {p.desc && (
                        <span className="mt-1 line-clamp-2 block text-sm text-white/70">
                          {p.desc}
                        </span>
                      )}
                      <span className="mt-2 block">
                        <Meta p={p} light />
                      </span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section
        className="container-page py-14 sm:py-16"
        aria-labelledby="more-t"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="more-t" className="text-3xl font-semibold">
            More guides from Waggle
          </h2>
          <ul className="flex flex-wrap gap-2">
            {(Object.keys(SECTIONS) as ArticleSection[]).map((s) => (
              <li key={s}>
                <Link
                  href={`/learn/section/${s}`}
                  className="chip px-4 py-2 text-sm hover:border-ink"
                >
                  {SECTIONS[s].name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <ArticleCard a={lead!} large />
          <div className="grid gap-4">
            {rest.slice(0, 2).map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>
        </div>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(2).map((a) => (
            <li key={a.slug}>
              <ArticleCard a={a} />
            </li>
          ))}
        </ul>
        <Link
          href="/videos"
          className="group mt-10 flex items-center justify-between gap-6 rounded-[var(--radius-card)] bg-clay-50 p-8"
        >
          <span>
            <span className="eyebrow">Pet Travel Videos</span>
            <span className="mt-2 block font-display text-2xl font-semibold">
              Traveling Tails on Waggle TV
            </span>
            <span className="mt-1 block text-sm text-muted">
              Pet wellness, RV travel and road trip wellness, on video.
            </span>
          </span>
          <PlayCircle
            className="size-10 shrink-0 text-clay transition-transform group-hover:scale-110"
            aria-hidden
          />
        </Link>
        <p className="mt-8 flex items-center gap-1.5 text-xs text-muted">
          <ArrowUpRight className="size-3.5" aria-hidden /> Blog posts above
          open the original article on mywaggle.com in a new tab.
        </p>
      </section>
    </>
  );
}
