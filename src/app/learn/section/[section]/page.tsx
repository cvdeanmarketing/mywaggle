import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  Caravan,
  Clock,
  Compass,
  Dog,
  Heart,
  Route,
  Sun,
  Thermometer,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, type ArtKey, type Product } from "@/lib/catalog";
import { HeatstrokeGuide } from "@/components/guides/HeatstrokeGuide";
import { PetGuidesHero } from "@/components/guides/PetGuidesHero";
import { RvingGuide } from "@/components/guides/RvingGuide";
import {
  ARTICLES,
  SECTIONS,
  type ArticleSection,
} from "@/lib/content/articles";
import { ArticleCard } from "@/components/learn/ArticleCard";
import { ProductArt } from "@/components/product/ProductArt";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function generateStaticParams() {
  return Object.keys(SECTIONS).map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const s = SECTIONS[section as ArticleSection];
  if (!s) return {};
  return {
    title: `${s.name} | Wag Reads`,
    description: s.blurb,
    alternates: { canonical: `/learn/section/${section}` },
  };
}

type Theme = {
  bg: string;
  accent: string;
  chip: string;
  icons: (typeof Sun)[];
  headline: string;
  art: ArtKey[];
  gear: string[];
  original?: string;
  gearTitle: string;
};

const THEMES: Record<ArticleSection, Theme> = {
  "rving-with-pets": {
    bg: "bg-[#e5ecf4]",
    accent: "text-signal",
    chip: "bg-paper text-ink",
    icons: [Caravan, Route, Compass],
    headline: "Hit the road. Bring them along.",
    art: ["mini-cam-4g", "observation-system"],
    gear: ["rv-4g-mini-camera", "rv-observation-system"],
    original: "RVing with Pets",
    gearTitle: "Gear for life on the road",
  },
  heatstroke: {
    bg: "bg-[#f4e3d6]",
    accent: "text-clay-700",
    chip: "bg-paper text-ink",
    icons: [Sun, Thermometer, Heart],
    headline: "Heat can turn dangerous fast. Be ready.",
    art: ["monitor-pro", "monitor-lite"],
    gear: ["pet-monitor-pro-plus", "pet-monitor-lite-plus"],
    original: "Heatstroke in Pets",
    gearTitle: "Know the moment it gets too hot",
  },
  "pet-guides": {
    bg: "bg-[#efe6dc]",
    accent: "text-clay-700",
    chip: "bg-paper text-ink",
    icons: [Dog, Heart, BookOpen],
    headline: "Everyday care, explained simply.",
    art: ["wagglecam-pro", "wifi-mini-cam"],
    gear: ["wagglecam-pro", "rv-wifi-mini-cam"],
    original: "Pet Guides",
    gearTitle: "Keep an eye on them at home",
  },
  "buying-guides": {
    bg: "bg-[#e9ece4]",
    accent: "text-signal",
    chip: "bg-paper text-ink",
    icons: [Compass, BookOpen, Heart],
    headline: "Pick the right setup with confidence.",
    art: ["monitor-pro", "mini-cam-4g"],
    gear: ["pet-monitor-pro-plus", "rv-4g-mini-camera"],
    gearTitle: "Popular starting points",
  },
};

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const s = SECTIONS[section as ArticleSection];
  if (!s) notFound();
  const key = section as ArticleSection;
  const t = THEMES[key];
  const list = ARTICLES.filter((a) => a.section === section);
  const [lead, ...rest] = list;
  const minutes = list.reduce((sum, a) => sum + a.readMinutes, 0);
  const gear = t.gear.map(getProduct).filter((p): p is Product => Boolean(p));

  return (
    <>
      {key === "rving-with-pets" ? (
        <RvingGuide />
      ) : key === "heatstroke" ? (
        <HeatstrokeGuide />
      ) : key === "pet-guides" ? (
        <PetGuidesHero />
      ) : (
        <header className={`relative overflow-hidden ${t.bg}`}>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-[26rem] rounded-full bg-paper/50 blur-2xl"
          />
          <div className="container-page relative pb-14 pt-8 sm:pb-20">
            <Breadcrumbs
              items={[
                { name: "Wag Reads", path: "/learn" },
                { name: s.name, path: `/learn/section/${section}` },
              ]}
            />
            <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
              <div>
                <p className="eyebrow">Wag Reads · {s.name}</p>
                <h1 className="mt-3 text-[38px] font-semibold leading-[1.05] sm:text-5xl">
                  {s.name}
                </h1>
                <p
                  className={`mt-3 font-display text-2xl font-semibold ${t.accent}`}
                >
                  {t.headline}
                </p>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/75">
                  {s.blurb}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  <li
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-sm ${t.chip}`}
                  >
                    <BookOpen className="size-4" aria-hidden /> {list.length}{" "}
                    {list.length === 1 ? "guide" : "guides"}
                  </li>
                  <li
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-sm ${t.chip}`}
                  >
                    <Clock className="size-4" aria-hidden /> {minutes} min of
                    reading
                  </li>
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a
                    href="#guides"
                    className="btn-primary px-7 py-3.5 text-base"
                  >
                    Start reading <ArrowRight className="size-4" aria-hidden />
                  </a>
                </div>
              </div>

              <div
                className="relative mx-auto w-full max-w-[460px]"
                aria-hidden
              >
                <div className="rounded-[36px] bg-paper p-5 shadow-[var(--shadow-lift)]">
                  <div className="grid grid-cols-2 gap-3">
                    {t.art.map((a) => (
                      <div
                        key={a}
                        className={`aspect-square rounded-2xl ${t.bg}`}
                      >
                        <ProductArt art={a} title="" className="size-full" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-around rounded-2xl bg-sand py-3">
                    {t.icons.map((Icon, i) => (
                      <span
                        key={i}
                        className={`flex size-10 items-center justify-center rounded-full bg-paper shadow-sm ${t.accent}`}
                      >
                        <Icon className="size-5" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      <div id="guides" className="container-page scroll-mt-32 py-14 sm:py-16">
        {lead && (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <ArticleCard a={lead} large />
            <div
              className={`flex flex-col justify-center rounded-[var(--radius-card)] p-7 sm:p-9 ${t.bg}`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/60">
                Quick answer
              </p>
              <p className="mt-3 font-display text-xl font-semibold leading-snug sm:text-2xl">
                {lead.quickAnswer}
              </p>
              <Link
                href={`/learn/${lead.slug}`}
                className="link mt-5 inline-flex items-center gap-1.5"
              >
                Read the full guide{" "}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        )}
        {rest.length > 0 && (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <li key={a.slug}>
                <ArticleCard a={a} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <section
        className={`${t.bg} py-14 sm:py-16`}
        aria-labelledby="gear-title"
      >
        <div className="container-page">
          <h2 id="gear-title" className="text-center text-3xl font-semibold">
            {t.gearTitle}
          </h2>
          <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            {gear.map((p) => (
              <li key={p.handle}>
                <Link
                  href={`/products/${p.handle}`}
                  className="group flex items-center gap-4 rounded-3xl bg-paper p-4 shadow-sm transition-shadow hover:shadow-[var(--shadow-lift)]"
                >
                  <span
                    className={`block size-24 shrink-0 rounded-2xl ${t.bg}`}
                  >
                    <ProductArt art={p.art} title="" className="size-full" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold leading-tight">
                      {p.name}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm text-muted">
                      {p.tagline}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-signal">
                      Shop{" "}
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
