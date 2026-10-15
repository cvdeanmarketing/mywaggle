/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import {
  Check,
  Gauge,
  Heart,
  Radio,
  Signal,
  Smartphone,
  Thermometer,
} from "lucide-react";
import { REFERRAL_TERMS } from "@/lib/programs";
import { Faq } from "@/components/ui/Faq";
import { ProgramHero, Steps } from "@/components/partners/ProgramHero";
import { InterestForm } from "@/components/ui/InterestForm";

export const metadata: Metadata = {
  title: "Refer a Friend, Get Rewarded",
  description:
    "Share Waggle with a friend who travels with pets and earn a commission when they buy.",
  alternates: { canonical: "/refer" },
};

const FAQS = [
  {
    q: "Is there a minimum order to earn rewards?",
    a: "Your reward depends on your friend's qualifying hardware order. Accessories alone don't qualify.",
  },
  {
    q: "Can I join more than one referral offer?",
    a: "One referral link per person, and one reward per order. Ambassador and referral links share one system.",
  },
  {
    q: "When do I get paid?",
    a: `Rewards are earned after the ${REFERRAL_TERMS.returnWindowDays}-day return window closes and your friend's required plan is active.`,
  },
  {
    q: "Is there a limit to how much I can earn?",
    a: "There's no limit on referrals. Share more, earn more.",
  },
];

const WHY = [
  [
    Thermometer,
    "No more RV temperature anxiety",
    "Waggle monitors 24/7 on its own 4G and alerts your phone the moment conditions change.",
  ],
  [
    Signal,
    "4G coverage, no campsite Wi-Fi needed",
    "Waggle runs on its own built-in 4G, not your RV's Wi-Fi, so it keeps working in remote parks and rest stops.",
  ],
  [
    Smartphone,
    "Real-time alerts, any distance",
    "Hiking two miles from camp? You'll still get the alert the moment something shifts.",
  ],
  [
    Heart,
    "Built for families who travel with pets",
    "From road trips to full-time RV life, Waggle was built around one belief: pets belong on every adventure.",
  ],
  [
    Radio,
    "Your friend will genuinely thank you",
    "Sharing your link is doing a fellow pet parent a real favor.",
  ],
] as const;

export default function ReferPage() {
  const pct = Math.round(REFERRAL_TERMS.commissionRate * 100);
  return (
    <>
      <ProgramHero
        crumb={{ name: "Refer & Earn", path: "/refer" }}
        tag="Refer a Friend Program"
        title="Share Waggle."
        accent="Get rewarded."
        intro="Refer a friend who travels with a pet. When their order is final, you earn."
        primary={{ label: "Get my referral link", href: "#join" }}
        secondary={{ label: "How it works", href: "#how" }}
        photos={[
          "/images/about/how-waggle-1.webp",
          "/images/partners/ab-sec-5-3.webp",
          "/images/partners/ab-sec-5-2.webp",
          "/images/partners/ab-sect-2.webp",
        ]}
        chips={["Share your link", `Earn ${pct}% commission`]}
        pills={[
          `${pct}% commission`,
          "No referral limit",
          "Track in your account",
        ]}
      />

      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Your reward</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">
            Same reward every time. No tiers. No guessing.
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-[1fr_1.1fr]">
          <div className="rounded-3xl bg-ink p-8 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-signal">
              Commission
            </p>
            <p className="mt-2 font-display text-7xl font-semibold">{pct}%</p>
            <p className="mt-2 text-white/75">
              of your friend&apos;s {REFERRAL_TERMS.commissionBase}.
            </p>
            <p className="mt-4 text-xs font-bold text-clay">
              Proposed terms, pending finance review.
            </p>
          </div>
          <div className="rounded-3xl bg-sand p-8">
            <p className="font-display text-lg font-semibold">
              What counts as a qualifying referral
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {REFERRAL_TERMS.qualifying.map((q) => (
                <li key={q} className="flex gap-2.5">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-mint"
                    aria-hidden
                  />
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="how" className="scroll-mt-32 bg-sand py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-center text-3xl font-semibold sm:text-4xl">
            As easy as packing a leash
          </h2>
          <div className="mt-10">
            <Steps
              steps={[
                {
                  title: "Get your link",
                  body: "Enter your email and your unique personal referral link is generated.",
                },
                {
                  title: "Share it anywhere",
                  body: "Text, Facebook groups, RV forums, anywhere fellow pet parents gather.",
                },
                {
                  title: "Collect your reward",
                  body: "Friend buys, the return window closes, their plan is active: your reward unlocks.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Why pet travelers share Waggle</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">
            The reward is a bonus. This is the reason people share.
          </h2>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map(([Icon, t, d]) => (
            <li key={t} className="rounded-3xl border border-line bg-paper p-6">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-signal-50 text-signal">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="join"
        className="scroll-mt-32 bg-ink py-16 text-white sm:py-20"
      >
        <div className="container-page grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-signal">
              <Gauge className="mr-1 inline size-4" aria-hidden />
              Ready to earn while your friends travel safer?
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">
              Get your link in 60 seconds.
            </h2>
            <p className="mt-4 text-lg text-white/75">
              No referral limit. Rewards after the return window closes.
            </p>
          </div>
          <div className="rounded-3xl bg-paper p-6 text-ink sm:p-8">
            <InterestForm
              source="refer-link"
              cta="Get my referral link"
              success="Thanks! Your referral link will be emailed to you."
              fields={[
                { name: "name", label: "Name", required: true },
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                  required: true,
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.6fr]">
          <h2 className="text-3xl font-semibold">Quick answers</h2>
          <Faq items={FAQS} />
        </div>
      </section>
    </>
  );
}
