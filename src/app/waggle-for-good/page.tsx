/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
  Users,
  Megaphone,
} from "lucide-react";
import { PageHeader } from "@/components/shop/PageHeader";

export const metadata: Metadata = {
  title: "Waggle for Good",
  description:
    "Building a better life for pets and pet parents: Waggle's mission, vision and promise.",
  alternates: { canonical: "/waggle-for-good" },
};

const BLOCKS = [
  {
    icon: HeartHandshake,
    img: "/images/about/how-waggle-3.webp",
    title: "A Vision Rooted in Care",
    text: "We’re not just creating products; we’re creating a community. A community of pet parents who, like us, want nothing but the best for their furry companions. Every feature we design, every innovation we pursue, stems from a deep understanding of the unique bond between pets and their humans.",
  },
  {
    icon: ShieldCheck,
    img: "/images/about/how-waggle-2.webp",
    title: "Keeping Pets Safe",
    text: "From real-time temperature monitoring to instant alerts, Waggle helps your pets stay safe and comfortable — no matter where you are. We’re your partner in preventing heat-related risks, because their safety is our priority.",
  },
  {
    icon: Users,
    img: "/images/about/how-waggle-4.webp",
    title: "Empowering Pet Parents",
    text: "We’re here to give you peace of mind. Whether it’s monitoring your pet during a road trip or ensuring their well-being at home, Waggle empowers you with tools to stay connected and in control.",
  },
  {
    icon: Megaphone,
    img: "/images/about/why-what-2.webp",
    title: "Advocating for Responsible Pet Parenting",
    text: "Through education, resources, and community initiatives, we’re committed to raising awareness about pet protection and responsible care. Together, we can create a safer, happier world for pets everywhere.",
  },
];

export default function WaggleForGoodPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Waggle for Good", path: "/waggle-for-good" }]}
        eyebrow="Our mission"
        title="Building a better life for pets and pet parents"
        intro="At Waggle, we believe every pet deserves a life full of love, comfort, and safety. Our mission goes beyond technology. We’re here to make a difference in the lives of pets and the humans who love them."
        image="/images/about/wfg-vis-img.webp"
        bg="bg-signal-50"
      />
      <div className="container-page space-y-16 py-16 sm:space-y-24 sm:py-20">
        {BLOCKS.map(({ icon: Icon, img, title, text }, i) => (
          <section
            key={title}
            className="grid items-center gap-10 lg:grid-cols-2"
          >
            <img
              src={img}
              alt=""
              loading="lazy"
              className={`aspect-[4/3] w-full rounded-[2rem] object-cover shadow-[var(--shadow-lift)] ${i % 2 ? "lg:order-2" : ""}`}
            />
            <div>
              <span className="flex size-12 items-center justify-center rounded-full bg-clay-50 text-clay">
                <Icon className="size-6" aria-hidden />
              </span>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink/75">{text}</p>
            </div>
          </section>
        ))}
      </div>
      <section className="bg-sand py-16 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Why we do what we do
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/75">
              Every wagging tail, every joyful bark, every peaceful purr
              inspires us to do better. Pets aren’t just animals; they’re
              family. And family deserves nothing less than the best care
              possible.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink/75">
              At Waggle, we’re driven by love and guided by purpose. We’re here
              to build trust, create connections, and strengthen the bond
              between you and your pet. Because when they’re happy, you’re happy
              and that’s what matters most.
            </p>
            <p className="mt-4 text-lg font-semibold">
              A promise to put pets first and a pledge to support pet parents
              every step of the way.
            </p>
            <Link
              href="/shop"
              className="btn-primary mt-7 px-7 py-3.5 text-base"
            >
              Start safeguarding your pet{" "}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <img
            src="/images/about/waggle-promise.webp"
            alt="Pet parents with their dogs"
            loading="lazy"
            className="w-full rounded-[2rem] shadow-[var(--shadow-lift)]"
          />
        </div>
      </section>
    </>
  );
}
