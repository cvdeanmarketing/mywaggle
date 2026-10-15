/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AlphaForm } from "@/components/partners/AlphaForm";

export const metadata: Metadata = {
  title: "Join Waggle Alpha",
  description:
    "Sign up, test new Waggle products and help build a smarter world for our pets.",
  alternates: { canonical: "/alpha" },
};

const A = "/images/alpha";

const PERKS = [
  {
    icon: "why-wag-highlight",
    title: "FREE Welcome Gift",
    text: "Get a fun pet toy just for signing up!",
  },
  {
    icon: "why-wag-alph-6",
    title: "FREE Products to Test",
    text: "Be the first to try new releases and shape the future of pet tech.",
  },
  {
    icon: "why-wag-alph-2",
    title: "Earn Big for Smart Feedback",
    text: "Top feedback (following our guidelines) earns a $250 reward.",
  },
  {
    icon: "why-wag-alph-3",
    title: "$50 for Every Relevant Insight",
    text: "Share helpful feedback and get rewarded for each one.",
  },
  {
    icon: "why-wag-alph-4",
    title: "Access to Exclusive Resources",
    text: "Enjoy expert tips, tools, and support tailored for pet lovers.",
  },
  {
    icon: "why-wag-alph-5",
    title: "First Dibs on Deals",
    text: "Unlock early access to discounts and special offers before anyone else.",
  },
];

export default function AlphaPage() {
  return (
    <>
      <div className="container-page pt-6">
        <Breadcrumbs
          items={[
            { name: "Partner with Us", path: "/partners" },
            { name: "Waggle Alpha", path: "/alpha" },
          ]}
        />
      </div>

      {/* Banner */}
      <section className="container-page mt-4">
        <div
          className="relative flex min-h-[22rem] items-start justify-center overflow-hidden rounded-[28px] bg-[#efe6df] bg-cover bg-bottom px-6 pt-14 text-center sm:min-h-[26rem] sm:pt-20"
          style={{ backgroundImage: `url(${A}/wag-alpha-banner.webp)` }}
        >
          <div>
            <h1 className="text-[34px] font-semibold leading-tight sm:text-5xl">
              Join <span className="text-signal">Waggle Alpha</span>
              <span className="mt-1 block">
                Be more than a pet parent. Be a pioneer!
              </span>
            </h1>
            <p className="mt-4 text-lg text-ink/70">
              Sign up, test new products, and help build a smarter world for our
              pets.
            </p>
            <a
              href="#join"
              className="mt-6 inline-flex rounded-full bg-signal px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-signal-700"
            >
              Join Waggle Alpha
            </a>
          </div>
        </div>
      </section>

      {/* Why join */}
      <section
        className="container-page py-14 sm:py-20"
        aria-labelledby="why-alpha"
      >
        <div className="text-center">
          <h2 id="why-alpha" className="text-3xl font-semibold sm:text-4xl">
            Why Join Waggle Alpha?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/70">
            Be more than a pet parent - be a pioneer! As part of our exclusive
            tester group, you’ll enjoy:
          </p>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {PERKS.map((p, i) => (
            <li
              key={p.title}
              className={`rounded-[28px] p-7 transition-transform hover:-translate-y-1 ${i === 0 ? "bg-signal text-white" : "bg-[#dcedff] text-ink"}`}
            >
              <img
                src={`${A}/${p.icon}.webp`}
                alt=""
                width={36}
                height={36}
                className={`size-9 object-contain ${i === 0 ? "brightness-0 invert" : ""}`}
              />
              <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
              <p
                className={`mt-1 text-sm leading-relaxed ${i === 0 ? "text-white/90" : "text-ink/75"}`}
              >
                {p.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Be the voice */}
      <section className="container-page">
        <div
          className="relative overflow-hidden rounded-[28px] bg-[#3b3330] bg-cover bg-center px-7 py-12 text-white sm:px-14 sm:py-16"
          style={{ backgroundImage: `url(${A}/wag-alpha-bnr-2.webp)` }}
        >
          <div className="max-w-md">
            <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
              You’ve been the heart of Waggle,{" "}
              <span className="text-signal">now be the voice!</span>
            </h2>
            <ul className="mt-8 space-y-4 text-base">
              {[
                ["wa-camper-van", "RVing with pets? You’ve done it"],
                ["wa-heart", "Kept pets protected on the move? Absolutely"],
                ["wa-arrow", "Know what works in the wild? You bet"],
              ].map(([icon, t]) => (
                <li key={t} className="flex items-center gap-4">
                  <img
                    src={`${A}/${icon}.webp`}
                    alt=""
                    width={28}
                    height={28}
                    className="size-7 object-contain"
                  />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3">
              <img
                src={`${A}/wa-group-img.webp`}
                alt=""
                width={266}
                height={26}
                className="h-7 w-auto"
              />
            </div>
          </div>
          <div aria-hidden className="h-24 sm:h-40" />
        </div>
      </section>

      {/* Form */}
      <section id="join" className="container-page scroll-mt-32 py-14 sm:py-20">
        <h2 className="text-center text-3xl font-semibold sm:text-4xl">
          Ready to Join?
        </h2>
        <div className="mx-auto mt-8 max-w-2xl rounded-[28px] bg-[#f1f1f1] p-6 sm:p-10">
          <AlphaForm />
        </div>
      </section>
    </>
  );
}
