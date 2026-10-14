/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { PageHeader } from "@/components/shop/PageHeader";
import { InterestForm } from "@/components/ui/InterestForm";

export const metadata: Metadata = {
  title: "Waggle Saves Lives: Real Pet Stories",
  description:
    "Real pets, real stories, real lives saved. Read stories from Waggle pet parents and share your own.",
  alternates: { canonical: "/saves-lives" },
};

const STORIES = [
  {
    img: "/images/stories/real-story-img.webp",
    quote:
      "Traveling full-time with our rescue pup Hugo, the Waggle Pet Monitor has transformed our RV adventures. We can now explore remote trails and national parks with complete peace of mind, knowing we’ll be instantly alerted to any temperature changes. After two years on the road with Waggle, we simply wouldn’t travel without it!",
    who: "Megan Dodd",
    where: "Dodd Squad RV",
  },
  {
    img: "/images/stories/real-story-img-2.webp",
    quote:
      "Waggle Pet Monitor and Mini Camera have been life saving for my pet. The Monitor tracks the environment in my RV, while the Camera lets me check in on Duchess, talk to her, and track her movements. Perfect combo for safety and peace of mind. Thank you, Waggle!",
    who: "Darlene",
    where: "Like there’s no tomorrow",
  },
  {
    img: "/images/stories/sys-real-story-img-3.webp",
    quote:
      "Thank you so much for everything. I posted the box today with the unopened Waggle in it. I really hate that I don’t need it now, but I have left an excellent review because I just love Waggle and the fantastic products you make. If I ever do return to traveling Waggle is the first thing I will be getting. You have saved the lives of my dogs many times in the past. Thank you again!",
    who: "Septima Pendell",
    where: "",
  },
];

export default function SavesLivesPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Wag Reads", path: "/learn" },
          { name: "Waggle Saves Lives", path: "/saves-lives" },
        ]}
        eyebrow="Real pets. Real stories."
        title="Real lives saved."
        intro="These pets are here today because of Waggle. Your pet’s silent guardian, especially when you’re not around."
        image="/images/stories/real-story-img.webp"
        imageAlt="A pet parent with their dog"
        bg="bg-clay-50"
      />
      <div className="container-page space-y-14 py-16 sm:space-y-20 sm:py-20">
        {STORIES.map((s, i) => (
          <article
            key={s.who}
            className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
          >
            <img
              src={s.img}
              alt=""
              loading="lazy"
              className={`mx-auto w-full max-w-sm rounded-[2rem] object-cover shadow-[var(--shadow-lift)] ${i % 2 ? "lg:order-2" : ""}`}
            />
            <blockquote>
              <Quote className="size-10 text-clay" aria-hidden />
              <p className="mt-4 font-display text-xl font-medium leading-relaxed sm:text-2xl">
                {s.quote}
              </p>
              <footer className="mt-5 text-sm font-bold">
                {s.who}
                {s.where ? (
                  <span className="font-normal text-muted"> · {s.where}</span>
                ) : null}
              </footer>
            </blockquote>
          </article>
        ))}
      </div>
      <section className="bg-ink py-16 text-white sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-signal">Chase the sun, not the stress</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">
              Travel smart. Travel safe. Travel with Waggle.
            </h2>
            <p className="mt-4 text-lg text-white/75">
              As temperatures rise, so does the risk to your pets. Heatstroke
              can occur in minutes, especially inside RVs, cars, or poorly
              ventilated spaces.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                href="/shop/pet-safety"
                className="inline-flex items-center gap-2 rounded-full bg-signal px-7 py-3.5 text-base font-bold text-white hover:bg-signal-700"
              >
                Shop pet safety <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/learn/section/heatstroke"
                className="inline-flex items-center rounded-full border border-white/25 px-7 py-3.5 text-base font-bold hover:bg-white/10"
              >
                Heatstroke guide
              </Link>
            </div>
          </div>
          <div id="share" className="rounded-3xl bg-paper p-6 text-ink sm:p-8">
            <p className="eyebrow">#ShareYourStory</p>
            <p className="mt-1 font-display text-2xl font-semibold">
              It could save a life.
            </p>
            <div className="mt-4">
              <InterestForm
                source="share-your-story"
                cta="Share your story"
                success="Thank you! We read every story."
                fields={[
                  { name: "name", label: "Your name", required: true },
                  {
                    name: "email",
                    label: "Email",
                    type: "email",
                    required: true,
                  },
                  {
                    name: "story",
                    label: "Your story",
                    type: "textarea",
                    required: true,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
