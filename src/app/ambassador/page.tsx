/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import {
  Calendar,
  Camera,
  Check,
  Compass,
  Crown,
  MessagesSquare,
  Users,
} from "lucide-react";
import { AMBASSADOR_ACTIVITIES, AMBASSADOR_TIERS } from "@/lib/programs";
import { ProgramHero, Steps } from "@/components/partners/ProgramHero";
import { InterestForm } from "@/components/ui/InterestForm";

export const metadata: Metadata = {
  title: "Waggle Ambassador Program",
  description:
    "Join a community of travel and pet leaders creating safer experiences at campgrounds, pet shows, competitions and beyond.",
  alternates: { canonical: "/ambassador" },
};

const WHO = [
  "You are an RVer: full-time, part-time, or weekend traveler",
  "You are an RV expert, campground host, or travel creator",
  "You are a pet parent who loves exploring with your pet",
  "You are a pet expert or pet professional who values safety and education",
  "You care about both adventure and responsibility",
  "No specific follower count required. Your passion matters more than your profile size!",
];

export default function AmbassadorPage() {
  return (
    <>
      <ProgramHero
        crumb={{ name: "Ambassadors", path: "/ambassador" }}
        tag="Waggle Ambassador Program"
        title="Turn your passion"
        accent="into impact."
        intro="Join a trusted community of travel and pet leaders creating safer experiences at campgrounds, pet shows, competitions, and beyond."
        primary={{ label: "Become a Waggle Ambassador", href: "#apply" }}
        secondary={{ label: "How it works", href: "#how" }}
        photos={[
          "/images/partners/ab-sec-5-2.webp",
          "/images/about/how-waggle-1.webp",
          "/images/partners/ab-sec-5-3.webp",
          "/images/partners/ab-sect-2.webp",
        ]}
        chips={["Represent Waggle at events", "Earn exclusive perks"]}
        pills={[
          "Earn exclusive perks",
          "Represent Waggle at events",
          "Protect pets everywhere",
        ]}
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">What is it?</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">
              What is the Waggle Ambassador Program?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">
              The Waggle Travel &amp; Pet Leaders Program brings together RVers,
              pet parents, professionals, and content creators who share one
              passion: safer travel with pets.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink/75">
              This isn’t just an influencer program. It’s a community-driven
              leadership program built around real-world impact. Our ambassadors
              help extend trust across the broader travel and pet community.
            </p>
          </div>
          <img
            src="/images/partners/ab-sec-4.webp"
            alt="Dogs and RVs on the road"
            loading="lazy"
            className="mx-auto w-full max-w-md"
          />
        </div>
      </section>

      <section className="bg-sand py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-center text-3xl font-semibold sm:text-4xl">
            Why join?
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                Users,
                "Community Connector",
                "You’re the one friends go to for advice and we love that. Help us reach more pet parents by being the friendly face of Waggle.",
              ],
              [
                Calendar,
                "Event Rep",
                "Represent Waggle at events, meetups, and shows. Spread awareness about keeping pets safe on the road.",
              ],
              [
                Camera,
                "Brand Advocate",
                "Share stories, content, and experiences to inspire others and show how Waggle makes a difference.",
              ],
              [
                MessagesSquare,
                "Feedback Insider",
                "Help improve products by sharing real feedback and ideas only pet parents can provide.",
              ],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Users;
              return (
                <li
                  key={t as string}
                  className="rounded-3xl bg-paper p-6 shadow-sm"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-clay-50 text-clay-700">
                    <I className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">
                    {t as string}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{d as string}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <img
            src="/images/partners/ab-sec-5-1.webp"
            alt=""
            loading="lazy"
            className="aspect-[573/424] w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
          />
          <div>
            <p className="eyebrow">Who this is for</p>
            <ul className="mt-4 space-y-3 text-lg">
              {WHO.map((w) => (
                <li key={w} className="flex gap-3">
                  <Check
                    className="mt-1 size-5 shrink-0 text-mint"
                    aria-hidden
                  />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="how" className="scroll-mt-32 bg-sand py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-center text-3xl font-semibold sm:text-4xl">
            How it works
          </h2>
          <div className="mt-10">
            <Steps
              steps={[
                {
                  title: "Apply & get started",
                  body: "Submit a quick application. Once approved, you’ll receive your welcome details and unique referral link.",
                },
                {
                  title: "Share what you already do",
                  body: "Share real pet travel moments, show how you keep pets safe, engage your community, represent Waggle at events and give honest feedback.",
                },
                {
                  title: "Earn perks & grow",
                  body: "Move through tiers, unlock rewards, gain visibility, and access bigger opportunities.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <h2 className="text-center text-3xl font-semibold sm:text-4xl">
          Ambassador tiers
        </h2>
        <ol className="mt-10 grid items-end gap-4 md:grid-cols-3">
          {AMBASSADOR_TIERS.map((t, i) => {
            const Icon = [Compass, Users, Crown][i]!;
            return (
              <li
                key={t.name}
                className={`rounded-3xl p-7 ${i === 2 ? "bg-ink text-white md:pb-12 md:pt-10" : i === 1 ? "border border-line bg-paper md:pb-9 md:pt-8" : "border border-line bg-paper"}`}
              >
                <span
                  className={`flex size-12 items-center justify-center rounded-2xl ${i === 2 ? "bg-signal text-white" : "bg-sand text-clay-700"}`}
                >
                  <Icon className="size-6" aria-hidden />
                </span>
                <p
                  className={`mt-4 text-xs font-bold uppercase tracking-[0.16em] ${i === 2 ? "text-signal" : "text-muted"}`}
                >
                  Level {i + 1}
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold">
                  {t.name}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${i === 2 ? "text-white/75" : "text-muted"}`}
                >
                  {t.summary}
                </p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="bg-clay-50 py-16 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              What ambassadors actually do
            </h2>
            <p className="mt-3 text-lg text-ink/75">
              Being an ambassador is straightforward.
            </p>
            <ul className="mt-5 space-y-3">
              {[
                ...AMBASSADOR_ACTIVITIES,
                "Represent Waggle at RV rallies, pet shows, competitions, clinics, or community events",
                "Provide honest feedback to help improve products",
                "Inspire RVers, pet parents, pet professionals, and travel lovers to move confidently",
              ].map((a) => (
                <li key={a} className="flex gap-3">
                  <Check
                    className="mt-1 size-5 shrink-0 text-mint"
                    aria-hidden
                  />
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-display text-xl font-semibold">
              No scripts. No forced promotion. Just real stories and real
              leadership.
            </p>
          </div>
          <img
            src="/images/partners/ab-sec-5-3.webp"
            alt=""
            loading="lazy"
            className="aspect-[573/424] w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
          />
        </div>
      </section>

      <section
        id="apply"
        className="scroll-mt-32 bg-ink py-16 text-white sm:py-20"
      >
        <div className="container-page grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-signal">Apply</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">
              Lead the movement.
            </h2>
            <p className="mt-4 text-lg text-white/75">
              Help protect pets wherever the road takes you. We read every
              application.
            </p>
          </div>
          <div className="rounded-3xl bg-paper p-6 text-ink sm:p-8">
            <InterestForm
              source="ambassador-application"
              cta="Join the program"
              success="You're in! We'll be in touch soon."
              fields={[
                { name: "name", label: "Full name", required: true },
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                  required: true,
                },
                { name: "city", label: "City and state", required: true },
                {
                  name: "travel",
                  label: "How do you usually travel with your pet?",
                  required: true,
                  options: [
                    "RV",
                    "Van / Camper",
                    "Road trips",
                    "Outdoor adventures",
                    "Other",
                  ],
                },
                {
                  name: "often",
                  label: "How often?",
                  required: true,
                  options: ["Full-time", "Frequently", "Occasionally"],
                },
                {
                  name: "social",
                  label:
                    "Where do you share your pet's adventures? (links or handles)",
                  required: true,
                },
                {
                  name: "how",
                  label: "How would you like to participate?",
                  required: true,
                  options: [
                    "Sharing lifestyle content",
                    "Referring friends",
                    "Representing Waggle at events and shows",
                    "Community engagement",
                    "Hosting AMAs/Webinars",
                    "Create helpful resources",
                  ],
                },
                {
                  name: "why",
                  label: "Why do you want to be a Waggle Ambassador?",
                  type: "textarea",
                  required: true,
                },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
