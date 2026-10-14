import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { SUITE } from "@/components/home/PetSuite";
import { PageHeader } from "@/components/shop/PageHeader";

export const metadata: Metadata = {
  title: "Waggle Pet Suite: Vet, Vault and Places",
  description:
    "Veterinary support, health records and pet-friendly travel, connected in the Waggle Pet App.",
  alternates: { canonical: "/pet-suite" },
};

const BEFORE = [
  "Multiple apps and logins",
  "Fragmented subscriptions",
  "Disconnected data",
  "Stress when you need clarity",
];
const WITH = [
  "One unified platform",
  "Single membership",
  "Everything synced",
  "Instant expert support",
];

export default function PetSuitePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Waggle Pet Suite", path: "/pet-suite" }]}
        eyebrow="Waggle Pet Suite"
        title="Everything your pet needs."
        intro="Veterinary support, pet-friendly travel, and health records, all in one connected platform."
        image="/images/app-home.webp"
        imageAlt="The Waggle Pet App on a phone"
        bg="bg-signal-50"
      >
        <a
          href={SITE.appStore}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-8 px-7 py-3.5 text-base"
        >
          Get the Waggle Pet App{" "}
          <span className="sr-only">(opens the App Store in a new tab)</span>
        </a>
      </PageHeader>

      <div className="container-page space-y-6 py-16 sm:py-20">
        {SUITE.map(({ id, name, icon: Icon, tone, text }) => (
          <section
            key={id}
            id={id}
            className="scroll-mt-32 flex flex-col items-start gap-5 rounded-[28px] border border-line bg-paper p-8 sm:flex-row sm:items-center sm:p-10"
          >
            <span
              className={`flex size-16 shrink-0 items-center justify-center rounded-2xl ${tone}`}
            >
              <Icon className="size-8" aria-hidden />
            </span>
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">{name}</h2>
              <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted">
                {text}
              </p>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-sand py-16 sm:py-20">
        <div className="container-page">
          <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold sm:text-4xl">
            Pet parenting has become complicated.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted">
            When your pet needs care, you are forced to navigate multiple
            platforms, subscriptions, and providers, all at once.
          </p>
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
            <div className="rounded-3xl bg-paper p-7">
              <p className="font-display text-xl font-semibold text-muted">
                Before Waggle
              </p>
              <ul className="mt-4 space-y-3">
                {BEFORE.map((t) => (
                  <li key={t} className="flex gap-3">
                    <X
                      className="mt-1 size-5 shrink-0 text-alert"
                      aria-hidden
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-ink p-7 text-white">
              <p className="font-display text-xl font-semibold text-signal">
                With Waggle
              </p>
              <ul className="mt-4 space-y-3">
                {WITH.map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check
                      className="mt-1 size-5 shrink-0 text-signal"
                      aria-hidden
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
