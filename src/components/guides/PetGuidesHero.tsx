/* eslint-disable @next/next/no-img-element */
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

const CATS = [
  "Pet Travel",
  "Pet Health",
  "Pet Protection",
  "Pet Essentials",
  "Pet Events",
  "Pet Food",
];

export function PetGuidesHero() {
  return (
    <header className="bg-paper">
      <div className="container-page pb-14 pt-8 sm:pb-20">
        <Breadcrumbs
          items={[
            { name: "Wag Reads", path: "/learn" },
            { name: "Pet Guides", path: "/learn/section/pet-guides" },
          ]}
        />
        <h1 className="mt-10 text-center text-[40px] font-semibold leading-[1.05] sm:text-5xl">
          Pet Guides
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-center text-lg text-ink/75">
          Everyday care for pets at home and away.
        </p>
        <ul className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATS.map((c, i) => (
            <li key={c}>
              <a
                href="#guides"
                className="group block rounded-3xl bg-sand p-4 text-center transition-shadow hover:shadow-[var(--shadow-lift)]"
              >
                <img
                  src={`/images/guides/pet/pet-guide-main-${i + 1}.png`}
                  alt=""
                  width={360}
                  height={260}
                  loading="lazy"
                  className="aspect-[360/260] w-full rounded-2xl object-cover"
                />
                <span className="mt-4 mb-1 block font-display text-lg font-semibold">
                  {c}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
