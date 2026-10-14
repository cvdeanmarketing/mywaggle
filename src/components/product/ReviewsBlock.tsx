"use client";

import { ArrowUpRight, Quote, Star } from "lucide-react";
import { useState } from "react";
import type { Review } from "@/lib/catalog/reviews";

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

function Card({ r }: { r: Review }) {
  return (
    <li className="flex h-full flex-col rounded-3xl border border-line bg-paper p-6">
      {r.rating ? (
        <Stars n={r.rating} />
      ) : (
        <Quote className="size-6 text-clay" aria-hidden />
      )}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/85">
        “{r.text}”
      </p>
      <p className="mt-4 text-sm font-bold">
        {r.name}
        {r.role ? (
          <span className="font-normal text-muted"> · {r.role}</span>
        ) : null}
      </p>
    </li>
  );
}

export function ReviewsBlock({
  name,
  rating,
  count,
  url,
  reviews,
}: {
  name: string;
  rating: number;
  count: number;
  url: string;
  reviews: Review[];
}) {
  const [all, setAll] = useState(false);
  const top = reviews.filter((r) => r.rating === 5).slice(0, 5);
  const shown = all ? reviews : top.length ? top : reviews.slice(0, 3);
  const hasMore = reviews.length > shown.length;
  return (
    <section
      id="reviews"
      className="border-t border-line py-16"
      aria-labelledby="rev-title"
    >
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="rev-title" className="text-3xl font-semibold">
              Customer reviews
            </h2>
            <p className="mt-2 flex items-center gap-2 text-muted">
              <Stars n={Math.round(rating)} />
              <span>
                <strong className="text-ink">{rating.toFixed(1)}</strong> out of
                5 from {count.toLocaleString("en-US")} ratings on mywaggle.com
              </span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {hasMore && (
              <button
                type="button"
                onClick={() => setAll(true)}
                className="btn-secondary"
              >
                Show all {reviews.length} here
              </button>
            )}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Read all reviews <ArrowUpRight className="size-4" aria-hidden />
              <span className="sr-only">(opens mywaggle.com in a new tab)</span>
            </a>
          </div>
        </div>
        {shown.length > 0 && (
          <>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-clay-700">
              {all
                ? `All reviews we have for ${name}`
                : top.length
                  ? "Top 5-star reviews"
                  : "What customers say"}
            </p>
            <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {shown.map((r) => (
                <Card key={r.name + r.text.slice(0, 12)} r={r} />
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
