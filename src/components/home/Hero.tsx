import { ArrowRight, BellRing, Radio, Thermometer, Video } from "lucide-react";
import Link from "next/link";
import { ProductArt } from "@/components/product/ProductArt";

const WHAT_WE_SELL = [
  { icon: Thermometer, label: "Temperature & power alerts", href: "/shop/pet-safety" },
  { icon: Video, label: "Pet cameras", href: "/shop/pet-cameras" },
  { icon: Radio, label: "Built-in 4G, no WiFi needed", href: "/shop/no-wifi" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-sand" aria-labelledby="hero-title">
      <div className="container-page grid items-center gap-10 pb-14 pt-10 sm:pt-14 lg:min-h-[620px] lg:grid-cols-[1.02fr_1fr] lg:gap-6 lg:pb-20 lg:pt-16">
        <div className="relative z-10 max-w-xl animate-fade-up">
          <p className="eyebrow">Connected pet safety</p>
          <h1 id="hero-title" className="mt-4 text-[44px] font-semibold leading-[1.02] sm:text-6xl lg:text-[68px]">
            Protect what matters.
            <span className="block text-clay-700">Wherever life takes you.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            Smart cameras, temperature monitors and connected safety tech that protect your pets, home and adventures. From your living room to the open
            road, Waggle keeps you connected to what matters most.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/find-your-waggle" className="btn-primary px-7 py-3.5 text-base">
              Find Your Waggle <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/shop" className="btn-secondary px-7 py-3.5 text-base">
              Shop All Products
            </Link>
          </div>
          <ul className="mt-10 grid gap-2 sm:flex sm:flex-wrap sm:gap-x-6" aria-label="What Waggle makes">
            {WHAT_WE_SELL.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <Link href={href} className="inline-flex items-center gap-2 text-sm font-bold text-ink/80 hover:text-ink">
                  <Icon className="size-4 text-clay" aria-hidden />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto aspect-[1/0.92] w-full max-w-[600px]" aria-hidden>
          <div className="absolute inset-[6%] rounded-[44px] bg-paper shadow-[var(--shadow-lift)]" />
          <div className="absolute inset-x-[6%] bottom-[6%] top-[52%] rounded-b-[44px] bg-gradient-to-t from-sand-2/80 to-transparent" />
          {/* Device family lineup */}
          <div className="absolute inset-x-[2%] bottom-[4%] flex items-end justify-center">
            <ProductArt art="mini-cam-4g" title="" className="-mr-[14%] w-[42%] animate-fade-up [animation-delay:200ms]" />
            <ProductArt art="monitor-pro" title="" className="z-10 w-[58%] animate-fade-up [animation-delay:80ms]" />
            <ProductArt art="wagglecam-pro" title="" className="z-[5] -ml-[16%] w-[42%] animate-fade-up [animation-delay:280ms]" />
            <ProductArt art="wifi-mini-cam" title="" className="-ml-[16%] w-[34%] animate-fade-up [animation-delay:360ms]" />
          </div>
          {/* App alert cards */}
          <div className="absolute left-0 top-[10%] w-[58%] max-w-[300px] animate-fade-up rounded-2xl bg-ink p-4 text-paper shadow-2xl [animation-delay:500ms] sm:p-5">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-clay">
              <BellRing className="size-3.5" /> Alert · RV living room
            </div>
            <p className="mt-2 font-display text-lg font-semibold leading-snug sm:text-xl">Temperature rising: 86°F</p>
            <p className="mt-1 text-xs text-muted-dark">Shore power lost 2 min ago. Sent by app, text and email.</p>
          </div>
          <div className="absolute right-0 top-[30%] w-[44%] max-w-[230px] animate-fade-up rounded-2xl border border-line bg-paper p-3.5 shadow-xl [animation-delay:650ms] sm:p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Home · Kitchen cam</p>
            <p className="mt-1.5 flex items-center gap-2 text-sm font-bold">
              <span className="size-2 rounded-full bg-mint" /> Biscuit is napping
            </p>
            <p className="mt-0.5 text-xs text-muted">72°F · 45% humidity</p>
          </div>
        </div>
      </div>
    </section>
  );
}
