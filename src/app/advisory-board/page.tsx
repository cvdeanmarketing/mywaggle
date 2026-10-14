/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shop/PageHeader";

export const metadata: Metadata = {
  title: "Pet Health Advisory Board",
  description:
    "Veterinary professionals and dog trainers who advise Waggle on product development.",
  alternates: { canonical: "/advisory-board" },
};

const ADVISORS = [
  {
    name: "Dr. Amber Rea",
    role: "Veterinarian",
    creds: "DVM, DACVIM",
    img: "/images/about/advisory-board-prof-img-1.webp",
    area: "Small animal medicine, surgery, dentistry, and evidence-based pet health and nutrition.",
    why: "To bring a veterinarian’s practical, clinical perspective to product development and help connect veterinary science with pet owners’ real-world needs.",
    how: "Their 15+ years of experience helps Waggle create safer, more practical, and pet-focused products for dogs and cats.",
  },
  {
    name: "Jamie Bozzi",
    role: "Certified Professional Dog Trainer",
    creds: "DVM, MS",
    img: "/images/about/advisory-board-prof-img-2.webp",
    area: "Professional dog training, canine behavior, scent detection, and competitive dog sports.",
    why: "To bring over 25 years of practical dog-training and behavior expertise to product development.",
    how: "Her experience helps Waggle create practical, dog-friendly products that support canine safety, comfort, training, and real-world use.",
  },
];

export default function AdvisoryBoardPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Waggle Advisory Board", path: "/advisory-board" }]}
        eyebrow="Expert-validated pet tech"
        title="Pet Health Advisory Board"
        intro="Meet our experts validating our products — veterinary professionals, dog trainers, and behaviour experts who ensure every Waggle product meets the highest standards of care."
        image="/images/about/advisory-board-banner-desk.webp"
        bg="bg-clay-50"
      />
      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Meet the experts helping shape the future of pet safety and
            wellness.
          </h2>
          <p className="mt-4 text-lg text-ink/75">
            Waggle partners with veterinary and pet care experts to ensure our
            products are built around real pet health and safety needs.
          </p>
        </div>
        <ul className="mt-12 grid gap-8 lg:grid-cols-2">
          {ADVISORS.map((a) => (
            <li
              key={a.name}
              className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper shadow-sm"
            >
              <div className="grid sm:grid-cols-[0.8fr_1.2fr]">
                <img
                  src={a.img}
                  alt={a.name}
                  loading="lazy"
                  className="aspect-[4/5] size-full object-cover sm:aspect-auto"
                />
                <div className="p-6 sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-wider text-clay-700">
                    {a.role}
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold">{a.name}</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="font-bold">Area of expertise</dt>
                      <dd className="text-muted">{a.area}</dd>
                    </div>
                    <div>
                      <dt className="font-bold">Why they advise Waggle</dt>
                      <dd className="text-muted">{a.why}</dd>
                    </div>
                    <div>
                      <dt className="font-bold">How their knowledge helps</dt>
                      <dd className="text-muted">{a.how}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-ink py-14 text-center text-white">
        <div className="container-page">
          <h2 className="text-3xl font-semibold">Products you can trust</h2>
          <Link href="/shop" className="btn-primary mt-6 px-7 py-3.5 text-base">
            Shop Waggle <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
