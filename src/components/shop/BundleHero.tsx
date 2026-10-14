"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { ProductArt } from "@/components/product/ProductArt";
import type { ArtKey } from "@/lib/catalog";

const SLOTS: { art: ArtKey; label: string }[] = [
  { art: "monitor-pro", label: "Pet Monitor Pro+" },
  { art: "mini-cam-4g", label: "RV 4G Mini Camera" },
  { art: "wifi-mini-cam", label: "RV WiFi Mini Cam" },
];

/** Top-of-shop banner that invites people into the bundle builder. `maxSaving` comes from published bundle prices. */
export function BundleHero({ maxSaving }: { maxSaving: number }) {
  const reduce = useReducedMotion();
  return (
    <section
      className="relative overflow-hidden bg-ink text-paper"
      aria-labelledby="bundle-hero-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-signal/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 left-1/4 size-[28rem] rounded-full bg-signal/10 blur-3xl"
      />
      <div className="container-page relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-paper/90">
            <Sparkles className="size-3.5 text-signal" aria-hidden /> Bundle
            builder
          </p>
          <h2
            id="bundle-hero-title"
            className="mt-5 text-[34px] font-semibold leading-[1.05] sm:text-5xl"
          >
            Build your own bundle.
            <span className="block text-signal">Pick. Pair. Save.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-dark">
            Choose the monitors and cameras you need. When your picks match a
            published Waggle bundle, the bundle price applies automatically
            {maxSaving > 0 ? (
              <>
                , saving up to{" "}
                <strong className="text-paper">${maxSaving}</strong>
              </>
            ) : null}
            .
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href="/bundles#build-a-bundle"
              className="inline-flex items-center gap-2 rounded-full bg-signal px-7 py-3.5 text-base font-bold text-paper transition-colors hover:bg-signal-700"
            >
              Build your bundle <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href="#all-products"
              className="text-sm font-bold text-paper/90 underline-offset-4 hover:underline"
            >
              Or shop all products ↓
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]" aria-hidden>
          <div className="rounded-[32px] border border-white/10 bg-white/[0.06] p-4 backdrop-blur sm:p-6">
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 sm:gap-3">
              {SLOTS.map((slot, i) => (
                <div key={slot.art} className="contents">
                  <motion.div
                    className="aspect-square rounded-2xl bg-paper shadow-xl"
                    animate={reduce ? undefined : { y: [0, -8, 0] }}
                    transition={{
                      duration: 3.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.35,
                    }}
                  >
                    <ProductArt art={slot.art} title="" className="size-full" />
                  </motion.div>
                  {i < SLOTS.length - 1 ? (
                    <motion.span
                      className="flex size-7 items-center justify-center rounded-full bg-signal text-paper sm:size-8"
                      animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.4,
                      }}
                    >
                      <Plus className="size-4" />
                    </motion.span>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm">
              <span className="text-paper/85">Your setup, one app</span>
              <span className="font-bold text-signal">
                Bundle price applies automatically
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
