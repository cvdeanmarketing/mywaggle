/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight, Camera, Heart } from "lucide-react";

const HANDLE = "waggletv";
const URL = `https://www.instagram.com/${HANDLE}/`;

const ROW_A = [
  ["/images/about/how-waggle-1.webp", "Couple playing with their dog outdoors"],
  ["/images/partners/ab-sec-5-2.webp", "Dog on a blanket at the beach"],
  ["/images/lifestyle/rv-4g-camera-on-rv.webp", "RV with a Waggle 4G camera"],
  ["/images/about/how-waggle-3.webp", "Family holiday with their dog"],
  ["/images/partners/ab-sect-2.webp", "Napping in the camper van with a dog"],
  ["/images/events/event-image.webp", "Campground in the hills"],
];
const ROW_B = [
  ["/images/about/why-what-2.webp", "Family relaxing with their dog"],
  ["/images/partners/ab-sec-5-3.webp", "Dog and owner playing on the couch"],
  ["/images/about/how-waggle-4.webp", "Friends with their dogs"],
  ["/images/lifestyle/rv-4g-mini-cams.webp", "Waggle RV mini cams"],
  ["/images/partners/ab-sec-5-1.webp", "Walking a dog in the hills"],
  ["/images/about/how-waggle-2.webp", "Dog at home with a Waggle monitor"],
];

function Tile({ src, alt }: { src: string; alt: string }) {
  return (
    <a
      href={URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block size-44 shrink-0 overflow-hidden rounded-3xl sm:size-56"
      tabIndex={-1}
      aria-label={`${alt} (Instagram)`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-white">
          <Heart className="size-4 fill-current" aria-hidden /> View on
          Instagram
        </span>
      </span>
    </a>
  );
}

function Row({ items, anim }: { items: string[][]; anim: string }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <ul
        className={`flex w-max gap-4 hover:[animation-play-state:paused] ${anim}`}
      >
        {doubled.map(([src, alt], i) => (
          <li key={i} aria-hidden={i >= items.length}>
            <Tile src={src!} alt={alt!} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InstagramFeed() {
  return (
    <section
      aria-labelledby="ig-title"
      className="relative overflow-hidden bg-ink py-16 text-white sm:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 size-96 rounded-full bg-signal/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-clay/30 blur-3xl"
      />
      <div className="container-page relative">
        <div className="flex flex-col items-center gap-5 text-center">
          <span className="rounded-full bg-gradient-to-tr from-clay via-signal to-clay p-[3px]">
            <span className="flex size-16 items-center justify-center rounded-full bg-ink">
              <Camera className="size-7" aria-hidden />
            </span>
          </span>
          <div>
            <p className="eyebrow text-signal">@{HANDLE}</p>
            <h2
              id="ig-title"
              className="mt-2 text-3xl font-semibold sm:text-5xl"
            >
              Follow the pack.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/75">
              Real pets, real road trips and the people who keep them safe. Join
              the Waggle community on Instagram.
            </p>
          </div>
          <a
            href={URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
          >
            Follow @{HANDLE} <ArrowUpRight className="size-4" aria-hidden />
            <span className="sr-only">(opens Instagram in a new tab)</span>
          </a>
        </div>
      </div>
      <div className="relative mt-12 space-y-4">
        <Row items={ROW_A} anim="animate-marquee-l" />
        <Row items={ROW_B} anim="animate-marquee-r" />
      </div>
    </section>
  );
}
