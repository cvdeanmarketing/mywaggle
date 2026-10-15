/* eslint-disable @next/next/no-img-element */
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

/** Dark program hero: headline, two buttons, tilted photo collage with floating chips. */
export function ProgramHero({
  crumb,
  tag,
  title,
  accent,
  intro,
  primary,
  secondary,
  photos,
  chips,
  pills,
}: {
  crumb: { name: string; path: string };
  tag: string;
  title: string;
  accent: string;
  intro: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  photos: [string, string, string, string];
  chips: [string, string];
  pills?: string[];
}) {
  return (
    <header className="relative isolate overflow-hidden bg-ink text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 -z-10 size-[34rem] rounded-full bg-signal/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-0 -z-10 size-[30rem] rounded-full bg-clay/35 blur-3xl"
      />
      <div className="container-page pb-20 pt-8 sm:pb-24">
        <div className="[&_*]:!text-white/80">
          <Breadcrumbs
            items={[{ name: "Partner with Us", path: "/partners" }, crumb]}
          />
        </div>
        <div className="mt-6 grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div className="max-lg:text-center">
            <p className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em]">
              {tag}
            </p>
            <h1 className="mt-5 text-[40px] font-semibold leading-[1.02] sm:text-6xl">
              {title} <span className="text-signal">{accent}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75 max-lg:mx-auto">
              {intro}
            </p>
            <div className="mx-auto mt-8 flex max-w-[320px] flex-col items-center gap-3 sm:max-w-none sm:flex-row sm:justify-center lg:justify-start lg:mx-0 lg:gap-4">
              <a
                href={primary.href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal px-7 py-3.5 sm:w-auto text-base font-bold text-white transition-colors hover:bg-signal-700"
              >
                {primary.label} <ArrowRight className="size-4" aria-hidden />
              </a>
              {secondary && (
                <a
                  href={secondary.href}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 sm:w-auto text-base font-bold transition-colors hover:bg-white/10"
                >
                  {secondary.label}
                </a>
              )}
            </div>
            {pills && (
              <ul className="mt-8 flex flex-wrap justify-center gap-2 text-sm font-bold lg:justify-start">
                {pills.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div
            className="relative mx-auto grid w-full max-w-lg grid-cols-6 grid-rows-6 gap-3"
            aria-hidden
          >
            <img
              src={photos[0]}
              alt=""
              className="col-span-4 row-span-4 size-full -rotate-2 rounded-3xl object-cover shadow-2xl"
            />
            <img
              src={photos[1]}
              alt=""
              className="col-span-2 col-start-5 row-span-3 row-start-2 size-full rotate-3 rounded-3xl object-cover shadow-2xl"
            />
            <img
              src={photos[2]}
              alt=""
              className="col-span-3 row-span-2 row-start-5 size-full rotate-2 rounded-3xl object-cover shadow-2xl"
            />
            <img
              src={photos[3]}
              alt=""
              className="col-span-3 col-start-4 row-span-2 row-start-5 size-full -rotate-1 rounded-3xl object-cover shadow-2xl"
            />
            <span className="absolute -left-3 top-6 rounded-2xl bg-paper px-4 py-2 text-sm font-bold text-ink shadow-xl">
              {chips[0]}
            </span>
            <span className="absolute -right-2 bottom-1/3 rounded-2xl bg-signal px-4 py-2 text-sm font-bold text-white shadow-xl">
              {chips[1]}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Steps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-5 md:grid-cols-3">
      {steps.map((s, i) => (
        <li
          key={s.title}
          className="relative rounded-3xl border border-line bg-paper p-7 shadow-sm"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-ink font-display text-lg font-semibold text-white">
            {i + 1}
          </span>
          <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
