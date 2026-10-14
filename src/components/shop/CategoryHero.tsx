/* eslint-disable @next/next/no-img-element */
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export interface HeroTheme {
  /** Lifestyle photo path under /images. */
  photo: string;
  /** Two product images under /images/products. */
  products: [string, string];
  bg: string;
  dark?: boolean;
  blob: string;
}

export function CategoryHero({
  crumbs,
  eyebrow,
  title,
  intro,
  theme,
  children,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow: string;
  title: string;
  intro: string;
  theme: HeroTheme;
  children?: React.ReactNode;
}) {
  const t = theme.dark;
  return (
    <header
      className={`relative isolate overflow-hidden ${theme.bg} ${t ? "text-white" : ""}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-24 -top-24 -z-10 size-[28rem] rounded-full blur-3xl ${theme.blob}`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -bottom-32 left-1/4 -z-10 size-[22rem] rounded-full blur-3xl ${theme.blob} opacity-60`}
      />
      <div className="container-page pb-14 pt-8 sm:pb-20">
        <div className={t ? "[&_*]:!text-white/80" : undefined}>
          <Breadcrumbs items={crumbs} />
        </div>
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div className="max-lg:text-center">
            <p className={`eyebrow ${t ? "text-signal" : ""}`}>{eyebrow}</p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.05] sm:text-[54px]">
              {title}
            </h1>
            <p
              className={`mt-5 max-w-xl max-lg:mx-auto text-lg leading-relaxed ${t ? "text-white/75" : "text-muted"}`}
            >
              {intro}
            </p>
            {children}
          </div>
          <div
            className="relative mx-auto hidden w-full max-w-lg sm:block"
            aria-hidden
          >
            <img
              src={theme.photo}
              alt=""
              className="aspect-[5/4] w-full rotate-1 rounded-[2rem] object-cover shadow-2xl"
            />
            <span className="absolute -bottom-6 -left-6 flex size-32 -rotate-6 items-center justify-center rounded-3xl bg-paper p-3 shadow-xl ring-1 ring-black/5">
              <img
                src={`/images/products/${theme.products[0]}.webp`}
                alt=""
                className="size-full object-contain"
              />
            </span>
            <span className="absolute -right-5 -top-6 flex size-28 rotate-6 items-center justify-center rounded-3xl bg-paper p-3 shadow-xl ring-1 ring-black/5">
              <img
                src={`/images/products/${theme.products[1]}.webp`}
                alt=""
                className="size-full object-contain"
              />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export const HERO_THEMES: Record<string, HeroTheme> = {
  "pet-safety": {
    photo: "/images/about/how-waggle-1.webp",
    products: ["pet-monitor-pro-plus", "pet-monitor-lite-plus"],
    bg: "bg-clay-50",
    blob: "bg-clay/30",
  },
  "pet-cameras": {
    photo: "/images/partners/ab-sec-5-3.webp",
    products: ["wagglecam-pro", "rv-wifi-mini-cam"],
    bg: "bg-signal-50",
    blob: "bg-signal/25",
  },
  "travel-adventure": {
    photo: "/images/partners/ab-sec-5-2.webp",
    products: ["waggle-4g-travelcam", "pet-monitor-pro-plus-satellite"],
    bg: "bg-sand",
    blob: "bg-clay/25",
  },
  "home-property": {
    photo: "/images/about/why-what-2.webp",
    products: ["rv-wifi-mini-cam", "wagglecam-pro"],
    bg: "bg-clay-50",
    blob: "bg-signal/20",
  },
  "rv-solutions": {
    photo: "/images/partners/ab-sect-2.webp",
    products: ["rv-4g-camera", "rv-observation-system"],
    bg: "bg-ink",
    dark: true,
    blob: "bg-signal/30",
  },
  "no-wifi": {
    photo: "/images/partners/ab-sec-5-1.webp",
    products: ["rv-4g-mini-camera", "pet-monitor-lite-plus"],
    bg: "bg-signal-50",
    blob: "bg-clay/25",
  },
  bundles: {
    photo: "/images/about/how-waggle-1.webp",
    products: ["bundle-roadsafe", "bundle-pet-scout"],
    bg: "bg-clay-50",
    blob: "bg-signal/25",
  },
};
