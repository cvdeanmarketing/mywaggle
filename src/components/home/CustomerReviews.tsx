import { Quote, Star } from "lucide-react";
import Link from "next/link";
import { getProduct } from "@/lib/catalog";
import { RATINGS, REVIEWS } from "@/lib/catalog/reviews";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FEATURED = [
  "pet-monitor-pro-plus",
  "wagglecam-pro",
  "rv-4g-mini-camera",
  "rv-4g-camera",
] as const;

function Stars({ n }: { n: number }) {
  return (
    <span
      className="flex gap-0.5"
      role="img"
      aria-label={`${n} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`size-4 ${i <= n ? "fill-clay text-clay" : "text-line"}`}
          aria-hidden
        />
      ))}
    </span>
  );
}

/** Visible rating summaries and customer comments (also readable by search and AI crawlers). Data lives in lib/catalog/reviews.ts. */
export function CustomerReviews() {
  const top = [
    ...(REVIEWS["rv-4g-mini-camera"] ?? []).filter((r) => r.rating === 5),
    ...(REVIEWS["wagglecam-pro"] ?? []),
    ...(REVIEWS["pet-monitor-pro-plus"] ?? []),
  ].slice(0, 6);
  return (
    <section className="bg-clay-50 py-16 sm:py-20" aria-labelledby="home-reviews">
      <div className="container-page">
        <SectionHeading
          id="home-reviews"
          align="left"
          eyebrow="Customer reviews"
          title="What pet parents say."
          intro="Ratings are the ones published on each product page. Comments are from customers on mywaggle.com."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((h) => {
            const p = getProduct(h);
            const r = RATINGS[h];
            if (!p || !r) return null;
            return (
              <li key={h}>
                <Link
                  href={`/products/${h}#reviews`}
                  className="flex h-full flex-col rounded-3xl bg-paper p-5 shadow-sm transition-shadow hover:shadow-[var(--shadow-lift)]"
                >
                  <Stars n={Math.round(r.rating)} />
                  <p className="mt-3 font-display text-3xl font-semibold">
                    {r.rating.toFixed(1)}
                    <span className="text-base font-normal text-muted">
                      {" "}
                      / 5
                    </span>
                  </p>
                  <p className="text-sm text-muted">
                    {r.count.toLocaleString("en-US")} ratings
                  </p>
                  <p className="mt-3 text-sm font-bold">{p.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {top.map((r) => (
            <li
              key={r.name + r.text.slice(0, 10)}
              className="flex flex-col rounded-3xl border border-line bg-paper p-6"
            >
              {r.rating ? (
                <Stars n={r.rating} />
              ) : (
                <Quote className="size-6 text-clay" aria-hidden />
              )}
              <p className="mt-3 flex-1 text-sm leading-relaxed">“{r.text}”</p>
              <p className="mt-4 text-sm font-bold">
                {r.name}
                {r.role ? (
                  <span className="font-normal text-muted"> · {r.role}</span>
                ) : null}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
