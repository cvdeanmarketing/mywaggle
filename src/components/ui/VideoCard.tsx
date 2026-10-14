"use client";

import { Play } from "lucide-react";
import { useState } from "react";

/** Click-to-play YouTube card: loads the player only when asked. */
export function VideoCard({
  id,
  title,
  tag,
}: {
  id: string;
  title: string;
  tag: string;
}) {
  const [on, setOn] = useState(false);
  return (
    <figure className="overflow-hidden rounded-3xl border border-line bg-paper shadow-sm">
      <div className="relative aspect-video bg-ink">
        {on ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setOn(true)}
            className="group absolute inset-0 size-full"
            aria-label={`Play video: ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-ink/20 transition-colors group-hover:bg-ink/10" />
            <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-signal text-white shadow-xl transition-transform group-hover:scale-110">
              <Play
                className="size-7 translate-x-0.5 fill-current"
                aria-hidden
              />
            </span>
          </button>
        )}
      </div>
      <figcaption className="p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-clay-700">
          {tag}
        </p>
        <p className="mt-1 font-display text-lg font-semibold leading-snug">
          {title}
        </p>
      </figcaption>
    </figure>
  );
}
