import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { devices, getProduct, type Product } from "@/lib/catalog";
import { HOME_FAQS } from "@/lib/content/faqs";
import { Hero } from "@/components/home/Hero";
import { ProductRail } from "@/components/home/ProductRail";
import { Ecosystem, Education, Lifestyles, SocialProof, WhyWaggle } from "@/components/home/Sections";
import { BundleBuilder } from "@/components/shop/BundleBuilder";
import { CompareTable } from "@/components/shop/CompareTable";
import { Quiz } from "@/components/shop/Quiz";
import { Faq } from "@/components/ui/Faq";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: { absolute: "Waggle | Pet Safety Monitors & Cameras That Work Anywhere" },
  description:
    "Smart cameras, 4G temperature monitors and connected safety tech that protect your pets, home and adventures, with or without WiFi. Find the right Waggle in four questions.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  // Lead with the four products the live homepage features, then the rest of the family.
  const lead = ["pet-monitor-pro-plus", "rv-4g-mini-camera", "rv-observation-system", "rv-wifi-mini-cam"];
  const railProducts = [
    ...lead.map(getProduct).filter((p): p is Product => Boolean(p)),
    ...devices()
      .filter((p) => !lead.includes(p.handle))
      .sort((a, b) => a.merchRank - b.merchRank),
  ];
  return (
    <>
      <Hero />
      <ProductRail products={railProducts} title="What's keeping your pet safe today?" listName="home_featured" />
      <Lifestyles />

      <section className="py-20 sm:py-28" aria-labelledby="quiz-title" id="find-your-waggle">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:items-start lg:gap-14">
          <div className="lg:sticky lg:top-36">
            <SectionHeading
              id="quiz-title"
              eyebrow="Find Your Waggle"
              title="Four questions. One clear answer."
              intro="Tell us what you're protecting and where. We'll match you with a device that works with your connectivity, and show the plan cost up front."
            />
          </div>
          <Quiz variant="embedded" />
        </div>
      </section>

      <WhyWaggle />
      <Ecosystem />

      <section className="bg-sand py-20 sm:py-28" aria-labelledby="compare-title">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading id="compare-title" eyebrow="Compare" title="Side by side, in plain English." intro="What each device does, how it connects, and what it costs to run." />
            <Link href="/compare" className="inline-flex shrink-0 items-center gap-1.5 font-bold hover:text-signal">
              Full comparison <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-10 rounded-[var(--radius-card)] bg-paper p-4 sm:p-6">
            <CompareTable selectable={false} handles={["pet-monitor-lite-plus", "pet-monitor-pro-plus", "wagglecam-pro", "rv-4g-mini-camera"]} />
          </div>
        </div>
      </section>

      <SocialProof />

      <section className="py-20 sm:py-28" aria-labelledby="bundle-title" id="build-a-bundle">
        <div className="container-page">
          <SectionHeading
            id="bundle-title"
            eyebrow="Build your own bundle"
            title="Mix and match your setup."
            intro="Pick the devices you need. When your selection matches a published Waggle bundle, the bundle price applies automatically."
          />
          <div className="mt-12">
            <BundleBuilder initial={["pet-monitor-lite-plus", "rv-wifi-mini-cam"]} />
          </div>
        </div>
      </section>

      <Education />

      <section className="bg-sand py-20 sm:py-28" aria-labelledby="faq-title">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.6fr]">
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Good questions." intro={<>Still curious? Chat with us 24/7 or read <Link href="/plans" className="link">how plans work</Link>.</>} />
          <Faq items={HOME_FAQS} withSchema />
        </div>
      </section>
    </>
  );
}
