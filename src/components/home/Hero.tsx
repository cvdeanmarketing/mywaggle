import { ArrowRight, Radio, ShieldCheck, Thermometer, Video } from "lucide-react";
import Link from "next/link";
import { StatsBand } from "@/components/home/StatsBand";

const WHAT_WE_SELL = [
  { icon: Thermometer, label: "Temperature & power alerts", href: "/shop/pet-safety" },
  { icon: Video, label: "Pet cameras", href: "/shop/pet-cameras" },
  { icon: Radio, label: "Built-in 4G, no WiFi needed", href: "/shop/no-wifi" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-sand" aria-labelledby="hero-title">
      <div className="container-page grid items-center gap-8 pb-8 pt-10 sm:pt-12 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:pb-8 lg:pt-14">
        <div className="relative z-10 max-w-2xl animate-fade-up">
          <p className="eyebrow">Connected pet safety</p>
          <h1 id="hero-title" className="mt-4 text-[40px] font-semibold leading-[1.04] sm:text-[48px] lg:text-[50px]">
            Keep your pets safe.
            <span className="block text-signal">At home or on the road.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink/80">
            Cameras and temperature monitors that tell you how your dog or cat is doing, whether you are at home, in the RV or miles away. Get an alert the moment it gets too hot, too cold or the power goes out.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/find-your-waggle" className="btn-primary px-7 py-3.5 text-base">
              Find Your Waggle <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/shop" className="btn-secondary px-7 py-3.5 text-base">
              Shop All Products
            </Link>
          </div>
          <ul className="mt-8 grid gap-2 sm:flex sm:flex-wrap sm:gap-x-6" aria-label="What Waggle makes">
            {WHAT_WE_SELL.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <Link href={href} className="inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-clay-700">
                  <Icon className="size-4 text-clay-700" aria-hidden />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[480px] animate-fade-up">
          <div className="absolute inset-x-[6%] bottom-0 h-[18%] rounded-full bg-ink/10 blur-2xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero-lineup.webp" alt="Waggle pet cameras and temperature monitors" width={619} height={374} className="relative w-full" fetchPriority="high" />
          <p className="relative mt-5 flex items-center justify-center gap-2 text-center font-display text-base font-semibold text-ink sm:text-lg">
            <ShieldCheck className="size-5 shrink-0 text-clay" aria-hidden />
            Your pet&apos;s safety is our #1 priority.
          </p>
          <div className="absolute -left-[4%] top-[6%] flex animate-fade-up items-center gap-3 rounded-2xl border border-line bg-paper py-3 pl-3 pr-5 shadow-xl [animation-delay:500ms]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/pug.webp" alt="" width={64} height={64} className="size-16 rounded-full object-cover ring-[3px] ring-clay" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Home · Kitchen cam</p>
              <p className="mt-0.5 flex items-center gap-2 text-sm font-bold">
                <span className="size-2 rounded-full bg-mint" /> Biscuit is napping
              </p>
              <p className="text-xs text-muted">72°F · 45% humidity</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-page pb-8"><StatsBand /></div>
    </section>
  );
}
