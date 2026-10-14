/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import {
  Gift,
  Heart,
  MapPin,
  MessageSquare,
  PackageOpen,
  Percent,
  Sparkles,
  Trophy,
  Wallet,
  Wrench,
} from "lucide-react";
import { ProgramHero } from "@/components/partners/ProgramHero";
import { InterestForm } from "@/components/ui/InterestForm";

export const metadata: Metadata = {
  title: "Join Waggle Alpha",
  description:
    "Sign up, test new Waggle products and help build a smarter world for our pets.",
  alternates: { canonical: "/alpha" },
};

const PERKS = [
  [Gift, "FREE welcome gift", "Get a fun pet toy just for signing up!"],
  [
    PackageOpen,
    "FREE products to test",
    "Be the first to try new releases and shape the future of pet tech.",
  ],
  [
    Trophy,
    "Earn big for smart feedback",
    "Top feedback (following our guidelines) earns a $250 reward.",
  ],
  [
    Wallet,
    "$50 for every relevant insight",
    "Share helpful feedback and get rewarded for each one.",
  ],
  [
    Wrench,
    "Access to exclusive resources",
    "Enjoy expert tips, tools, and support tailored for pet lovers.",
  ],
  [
    Percent,
    "First dibs on deals",
    "Unlock early access to discounts and special offers before anyone else.",
  ],
] as const;

export default function AlphaPage() {
  return (
    <>
      <ProgramHero
        crumb={{ name: "Waggle Alpha", path: "/alpha" }}
        tag="Waggle Alpha Program"
        title="Be more than a pet parent."
        accent="Be a pioneer!"
        intro="Sign up, test new products, and help build a smarter world for our pets."
        primary={{ label: "Join Waggle Alpha", href: "#join" }}
        secondary={{ label: "Why join?", href: "#why" }}
        photos={[
          "/images/partners/ab-sec-5-1.webp",
          "/images/partners/ab-sec-5-3.webp",
          "/images/about/how-waggle-1.webp",
          "/images/partners/ab-sec-5-2.webp",
        ]}
        chips={["Test products first", "Shape what ships"]}
        pills={[
          "Free welcome gift",
          "Free products to test",
          "Early access to deals",
        ]}
      />

      <section id="why" className="container-page scroll-mt-32 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold sm:text-5xl">
            Why join Waggle Alpha?
          </h2>
          <p className="mt-4 text-lg text-ink/75">
            Be more than a pet parent, be a pioneer! As part of our exclusive
            tester group, you’ll enjoy:
          </p>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PERKS.map(([Icon, t, d]) => (
            <li
              key={t}
              className="group rounded-3xl border border-line bg-paper p-7 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <span className="flex size-14 items-center justify-center rounded-2xl bg-signal-50 text-signal transition-colors group-hover:bg-signal group-hover:text-white">
                <Icon className="size-7" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-muted">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative isolate overflow-hidden bg-clay-50 py-16 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold sm:text-5xl">
              You’ve been the heart of Waggle,{" "}
              <span className="text-signal">now be the voice!</span>
            </h2>
            <ul className="mt-8 space-y-4 text-lg">
              {[
                [MapPin, "RVing with pets? You’ve done it."],
                [Heart, "Kept pets protected on the move? Absolutely."],
                [MessageSquare, "Know what works in the wild? You bet."],
              ].map(([Icon, t]) => {
                const I = Icon as typeof Heart;
                return (
                  <li
                    key={t as string}
                    className="flex items-center gap-4 rounded-2xl bg-paper p-4 shadow-sm"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-clay-50 text-clay-700">
                      <I className="size-5" aria-hidden />
                    </span>
                    <span className="font-semibold">{t as string}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="relative">
            <img
              src="/images/partners/ab-sec-5-2.webp"
              alt=""
              loading="lazy"
              className="aspect-[573/424] w-full -rotate-1 rounded-3xl object-cover shadow-[var(--shadow-lift)]"
            />
            <span className="absolute -bottom-4 -right-2 inline-flex items-center gap-2 rounded-2xl bg-ink px-4 py-2 text-sm font-bold text-white shadow-xl">
              <Sparkles className="size-4 text-signal" aria-hidden /> Alpha
              tester
            </span>
          </div>
        </div>
      </section>

      <section
        id="join"
        className="scroll-mt-32 bg-ink py-16 text-white sm:py-20"
      >
        <div className="container-page grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-signal">Sign up</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">
              Ready to join?
            </h2>
            <p className="mt-4 text-lg text-white/75">
              Tell us about you and your pet. Give us 24 hours and we’ll be
              wagging back soon.
            </p>
          </div>
          <div className="rounded-3xl bg-paper p-6 text-ink sm:p-8">
            <InterestForm
              source="waggle-alpha"
              cta="Sign me up"
              success="All set! Give us 24 hours, we'll be wagging back soon!"
              fields={[
                { name: "name", label: "Name", required: true },
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                  required: true,
                },
                { name: "age", label: "Age", required: true },
                {
                  name: "rv",
                  label: "Do you RV?",
                  options: ["Full time RVer", "Seasonal RVer", "No"],
                },
                {
                  name: "pet",
                  label: "Pet type",
                  options: ["Dog", "Cat", "Other"],
                },
                { name: "petage", label: "Age of pet?" },
                { name: "phone", label: "Phone", type: "tel" },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
