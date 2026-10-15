import {
  ArrowRight,
  Radio,
  ShieldCheck,
  Thermometer,
  Video,
} from "lucide-react";
import Link from "next/link";
import { StatsBand } from "@/components/home/StatsBand";

const WHAT_WE_SELL = [
  {
    icon: Thermometer,
    label: "Temperature & power alerts",
    href: "/shop/pet-safety",
  },
  { icon: Video, label: "Pet cameras", href: "/shop/pet-cameras" },
  { icon: Radio, label: "Built-in 4G, no WiFi needed", href: "/shop/no-wifi" },
];

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-sand"
      aria-labelledby="hero-title"
    >
      <div className="container-page grid items-center gap-8 pb-8 pt-10 sm:pt-12 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:pb-8 lg:pt-14">
        <div className="relative z-10 mx-auto max-w-2xl animate-fade-up max-lg:text-center lg:mx-0">
          <p className="eyebrow">Connected pet safety</p>
          <h1
            id="hero-title"
            className="mt-4 text-[40px] font-semibold leading-[1.04] sm:text-[48px] lg:text-[50px]"
          >
            Keep your pets safe.
            <span className="block text-signal">At home or on the road.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink/80 max-lg:mx-auto">
            Cameras and temperature monitors that tell you how your dog or cat
            is doing, whether you are at home, in the RV or miles away. Get an
            alert the moment it gets too hot, too cold or the power goes out.
          </p>
          <div className="mx-auto mt-8 flex max-w-[320px] flex-col gap-3 sm:max-w-none sm:flex-row lg:mx-0">
            <Link
              href="/find-your-waggle"
              className="btn-primary w-full px-7 py-3.5 text-base sm:w-auto sm:min-w-[210px]"
            >
              Find Your Waggle <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/shop"
              className="btn-secondary w-full px-7 py-3.5 text-base sm:w-auto sm:min-w-[210px]"
            >
              Shop All Products
            </Link>
          </div>
          <ul
            className="mt-8 grid justify-center gap-2 sm:flex sm:flex-wrap sm:gap-x-6 lg:justify-start"
            aria-label="What Waggle makes"
          >
            {WHAT_WE_SELL.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-clay-700"
                >
                  <Icon className="size-4 text-clay-700" aria-hidden />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-[84%] max-w-[400px] animate-fade-up lg:w-full lg:max-w-[480px]">
          <div className="absolute inset-x-[6%] bottom-0 h-[18%] rounded-full bg-ink/10 blur-2xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-lineup.webp"
            alt="Waggle pet cameras and temperature monitors"
            width={619}
            height={374}
            className="relative w-full"
            fetchPriority="high"
          />
          <p className="relative mt-5 flex flex-col items-center justify-center gap-1.5 text-center sm:flex-row sm:gap-2 font-display text-base font-semibold text-ink sm:text-lg">
            <ShieldCheck className="size-5 shrink-0 text-clay" aria-hidden />
            Your pet&apos;s safety is our #1 priority.
          </p>
          <div className="absolute left-0 top-[4%] flex animate-fade-up items-center gap-2.5 rounded-2xl border border-line bg-paper py-2 pl-2 pr-3.5 lg:-left-[4%] lg:top-[6%] lg:gap-3 lg:py-3 lg:pl-3 lg:pr-5 shadow-xl [animation-delay:500ms]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pug.webp"
              alt=""
              width={64}
              height={64}
              className="size-12 rounded-full object-cover ring-[3px] ring-clay lg:size-16"
            />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Home · Kitchen cam
              </p>
              <p className="mt-0.5 flex items-center gap-2 text-sm font-bold">
                <span className="size-2 rounded-full bg-mint" /> Biscuit is
                napping
              </p>
              <p className="text-xs text-muted">72°F · 45% humidity</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-page pb-8">
        <StatsBand />
      </div>
    </section>
  );
}
