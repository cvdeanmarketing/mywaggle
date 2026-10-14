import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Camera,
  CreditCard,
  Dog,
  FileText,
  Headset,
  House,
  MapPin,
  Mountain,
  Radio,
  Shield,
  Sun,
  Thermometer,
  Caravan,
  Route,
  WifiOff,
  Zap,
} from "lucide-react";
import Link from "next/link";
import type { ArtKey } from "@/lib/catalog";
import { ARTICLES, SECTIONS } from "@/lib/content/articles";
import { LIVE_SESSIONS } from "@/lib/live";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/format";
import { ProductArt } from "@/components/product/ProductArt";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* ───────────── Shop by lifestyle ───────────── */

const LIFESTYLES: { title: string; line: string; href: string; icon: typeof House; art: ArtKey; tone: string }[] = [
  { title: "Home all day", line: "Check in, talk, toss a treat.", href: "/shop/pet-cameras", icon: House, art: "wagglecam-pro", tone: "bg-[#efe6dc]" },
  { title: "Heat waves & outages", line: "Know the moment the AC or power fails.", href: "/shop/pet-safety", icon: Sun, art: "monitor-lite", tone: "bg-[#f4e3d6]" },
  { title: "Road trips", line: "Safety that rides along.", href: "/shop/travel-adventure", icon: Route, art: "travelcam", tone: "bg-[#e5ecf4]" },
  { title: "RV life", line: "Campsite to hitch, covered.", href: "/shop/rv-solutions", icon: Caravan, art: "observation-system", tone: "bg-[#e9ece4]" },
  { title: "Off-grid & no WiFi", line: "Built-in 4G and satellite backup.", href: "/shop/no-wifi", icon: WifiOff, art: "camera-4g", tone: "bg-[#e6e7ea]" },
  { title: "Cabin & property", line: "Battery and solar cameras.", href: "/shop/home-property", icon: Mountain, art: "mini-cam-4g", tone: "bg-[#ece7df]" },
];

export function Lifestyles() {
  return (
    <section className="bg-sand py-20 sm:py-28" aria-labelledby="life-title">
      <div className="container-page">
        <SectionHeading id="life-title" align="center" eyebrow="Shop by lifestyle" title="Wherever your pet spends the day." intro="Start with where life happens, and we'll show you what fits." />
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {LIFESTYLES.map(({ title, line, href, icon: Icon, art, tone }) => (
            <li key={title}>
              <Link href={href} className={cn("group flex h-full flex-col rounded-[var(--radius-card)] p-5 sm:p-7", tone)}>
                <span className="flex size-10 shrink-0 items-center justify-center self-start rounded-full bg-paper/80">
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                <span className="mt-4 block">
                  <span className="block font-display text-lg font-semibold leading-tight sm:text-2xl">{title}</span>
                  <span className="mt-1.5 block text-sm leading-snug text-ink/70">{line}</span>
                </span>
                <span className="mt-5 flex h-36 items-end justify-center sm:h-48">
                  <ProductArt art={art} title="" className="h-full w-auto transition-transform duration-500 ease-out group-hover:-translate-y-1" />
                </span>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold">
                  Shop <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── Why Waggle ───────────── */

const WHY = [
  { icon: Radio, title: "Works where WiFi doesn't", body: "Built-in 4G on our monitors and 4G cameras means no router, hotspot or campground WiFi to fail you." },
  { icon: Bell, title: "Every alert, three ways", body: "Temperature, humidity and power alerts go out by app, text and email at once, so one missed notification isn't the end of the story." },
  { icon: Zap, title: "Built for when power fails", body: "Power-loss alerts and backup batteries keep you informed through the outage that caused the problem." },
  { icon: Headset, title: "People behind the product", body: `${SITE.policies.support}, ${SITE.policies.shipping.toLowerCase()}, ${SITE.policies.returns} and a ${SITE.policies.warranty.toLowerCase()}.` },
];

export function WhyWaggle() {
  return (
    <section className="bg-ink py-20 text-paper sm:py-28" aria-labelledby="why-title">
      <div className="container-page">
        <SectionHeading id="why-title" tone="dark" eyebrow="Why Waggle" title={<>Safety that doesn&apos;t depend on luck.</>} />
      </div>
      <div className="container-page mt-14 grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-dark">
            Most pet tech gives you one thing: a camera, a tracker or a thermometer. Waggle connects them, and keeps them connected when the WiFi or the power
            doesn&apos;t cooperate.
          </p>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line-dark pt-8">
            {SITE.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-semibold">{s.value}</dd>
                <dd className="mt-1 text-xs text-muted-dark">{s.label}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[11px] text-muted-dark/80">Figures as reported by Waggle.</p>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-line-dark sm:grid-cols-2">
          {WHY.map(({ icon: Icon, title, body }) => (
            <li key={title} className="bg-ink-2 p-7">
              <Icon className="size-6 text-clay" aria-hidden />
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-dark">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── Connected ecosystem ───────────── */

const DEVICE_LAYERS = [
  { icon: Thermometer, title: "Temperature", body: "Heat, cold and humidity over 4G" },
  { icon: Camera, title: "Cameras", body: "See them and talk to them" },
  { icon: Shield, title: "Smart sensors", body: "Door and water-leak via Pro+ hub mode" },
  { icon: MapPin, title: "Geofence", body: "RVSentry boundary alerts" },
];
const SERVICE_LAYERS = [
  { icon: Activity, title: "Waggle Vet", body: "24/7 licensed vet access" },
  { icon: FileText, title: "Waggle Vault", body: "Records, secure and shareable" },
  { icon: Dog, title: "Waggle Places", body: "Pet-friendly stops and campgrounds" },
  { icon: CreditCard, title: "One subscription", body: "Data plus the suite, per device" },
];

function Layer({ icon: Icon, title, body, align }: { icon: typeof Thermometer; title: string; body: string; align: "left" | "right" }) {
  return (
    <li className={cn("relative flex items-center gap-4 rounded-2xl border border-line bg-paper p-4", align === "left" ? "lg:flex-row-reverse lg:text-right" : "")}>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sand">
        <Icon className="size-5 text-clay-700" aria-hidden />
      </span>
      <span>
        <span className="block font-bold">{title}</span>
        <span className="block text-sm text-muted">{body}</span>
      </span>
      <span
        aria-hidden
        className={cn("absolute top-1/2 hidden h-px w-8 bg-line lg:block", align === "left" ? "-right-8" : "-left-8")}
      />
    </li>
  );
}

export function Ecosystem() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="eco-title">
      <div className="container-page">
        <SectionHeading
          id="eco-title"
          align="center"
          eyebrow="The connected ecosystem"
          title="Not a device. A system."
          intro="Devices on the left, services on the right, one app in the middle. 4G and WiFi devices sit side by side, and every alert lands in the same place."
        />
        <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1fr_300px_1fr] lg:gap-16">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {DEVICE_LAYERS.map((l) => (
              <Layer key={l.title} {...l} align="left" />
            ))}
          </ul>
          <div className="relative mx-auto w-[260px] sm:w-[280px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/app-home.webp" alt="The Waggle app home screen showing temperature, humidity and a live pet camera view" width={640} height={1324} loading="lazy" className="w-full drop-shadow-2xl" />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {SERVICE_LAYERS.map((l) => (
              <Layer key={l.title} {...l} align="right" />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Social proof ───────────── */

const REVIEWS = [
  { outlet: "Dogster", title: "Waggle Pet Monitor Pro+ Review", url: "https://www.dogster.com/lifestyle/waggle-pet-monitor-pro-review/" },
  { outlet: "Catster", title: "WaggleCam Pro Review", url: "https://www.catster.com/lifestyle/wagglecam-pro-review/" },
  { outlet: "The Wayward Home", title: "I tested two Waggle RV pet cams", url: "https://www.thewaywardhome.com/waggle-pet-camera-review/" },
  { outlet: "RV LIFE", title: "Waggle Pet Monitor Review", url: "https://rvlife.com/waggle-pet-monitor-review/" },
  { outlet: "Camp Addict", title: "Waggle Pet Temperature Monitor", url: "https://campaddict.com/waggle-pet-temperature-monitor/" },
  { outlet: "Dog Gear Review", title: "Waggle PRO Pet Monitor Review", url: "https://doggearreview.com/review/waggle/" },
];

export function SocialProof() {
  return (
    <section className="border-y border-line bg-paper py-20 sm:py-24" aria-labelledby="proof-title">
      <div className="container-page">
        <SectionHeading id="proof-title" eyebrow="Reviews & press" title="Tested by people who test things." />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <p className="text-muted">
              Independent reviewers have put Waggle through real trips and real summers. Read their full, unedited takes.
            </p>
            <a
              href={SITE.amazonStore}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 flex aspect-square w-52 flex-col justify-end rounded-md bg-signal p-6 text-paper shadow-[var(--shadow-lift)] transition-colors hover:bg-signal-700"
            >
              <p className="font-display text-4xl font-semibold leading-none">{SITE.stats[1]!.value}</p>
              <p className="mt-3 text-sm font-bold leading-snug">{SITE.stats[1]!.label}</p>
              <p className="mt-1 text-xs text-white/80">As reported by Waggle</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold">
                See Waggle on Amazon <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </span>
            </a>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {REVIEWS.map((r) => (
              <li key={r.url}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between rounded-2xl border border-line p-5 transition-colors hover:border-ink"
                >
                  <span className="font-display text-xl font-semibold tracking-tight text-ink/80">{r.outlet}</span>
                  <span className="mt-6 flex items-end justify-between gap-3">
                    <span className="text-sm text-muted">{r.title}</span>
                    <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    <span className="sr-only">(opens in a new tab)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-14 border-t border-line pt-8">
          <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-muted">Featured by and partnered with</p>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {SITE.press.map((p) => (
              <li key={p} className="font-display text-lg font-semibold text-ink/45">{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Education ───────────── */

const TONE: Record<string, string> = {
  clay: "bg-clay text-paper",
  signal: "bg-signal text-paper",
  mint: "bg-mint text-paper",
  ink: "bg-ink text-paper",
};

export function Education() {
  const featured = ["cellular-vs-wifi", "pet-heat-safety", "rving-with-pets"].map((s) => ARTICLES.find((a) => a.slug === s)!);
  return (
    <section className="py-20 sm:py-28" aria-labelledby="learn-title">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="learn-title" eyebrow="Wag Reads" title="Know more. Worry less." intro="Straight answers on pet safety, travel and choosing the right setup." />
          <Link href="/learn" className="inline-flex shrink-0 items-center gap-1.5 font-bold hover:text-signal">
            View all guides <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <li key={a.slug}>
              <Link href={`/learn/${a.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line">
                <div className={cn("flex aspect-[16/9] flex-col justify-between p-6", TONE[a.tone])}>
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80">{SECTIONS[a.section].name}</span>
                  <span className="font-display text-2xl font-semibold leading-tight">{a.title}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex-1 text-sm leading-relaxed text-muted">{a.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold">
                    {a.readMinutes} min read <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid overflow-hidden rounded-[var(--radius-card)] bg-sand lg:grid-cols-[1fr_1.4fr]">
          <div className="p-8 sm:p-10">
            <p className="eyebrow">Waggle Live</p>
            <h3 className="mt-3 text-3xl font-semibold">Free expert sessions. Real answers.</h3>
            <p className="mt-3 text-muted">
              A vet, a trainer or a full-time RVer takes your questions live. Forty-five minutes, and you leave knowing exactly what to do next.
            </p>
            <Link href="/live" className="btn-primary mt-6">
              Save my seat <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ul className="grid gap-px bg-line sm:grid-cols-2">
            {LIVE_SESSIONS.slice(0, 4).map((s) => (
              <li key={s.title} className="bg-paper p-5">
                <p className="text-xs font-bold text-clay-700">{s.minutes ? `${s.minutes} min · ` : ""}Replay</p>
                <p className="mt-1 font-bold leading-snug">{s.title}</p>
                <p className="mt-1 text-xs text-muted">
                  {s.speaker}, {s.credential}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
