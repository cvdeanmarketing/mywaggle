/* eslint-disable @next/next/no-img-element */
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function PageHeader({
  crumbs,
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  bg = "bg-sand",
  children,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Lifestyle photo shown beside the heading on large screens. */
  image?: string;
  imageAlt?: string;
  bg?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className={`relative overflow-hidden ${bg}`}>
      <div className="container-page pb-12 pt-8 sm:pb-16">
        <Breadcrumbs items={crumbs} />
        <div
          className={
            image
              ? "mt-8 grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]"
              : "mt-8 max-w-3xl"
          }
        >
          <div className={`max-lg:text-center ${image ? "max-w-3xl" : ""}`}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="mt-3 text-4xl font-semibold leading-[1.05] sm:text-[56px]">
              {title}
            </h1>
            {intro && (
              <p className="mt-5 text-lg leading-relaxed text-muted max-lg:mx-auto max-lg:max-w-xl">
                {intro}
              </p>
            )}
            {image ? children : null}
          </div>
          {image && (
            <div className="relative hidden lg:block">
              <div
                aria-hidden
                className="absolute -inset-3 rotate-2 rounded-[2.5rem] bg-clay/15"
              />
              <img
                src={image}
                alt={imageAlt}
                className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-[var(--shadow-lift)]"
                loading="eager"
              />
            </div>
          )}
        </div>
        {image ? null : children}
      </div>
    </header>
  );
}
