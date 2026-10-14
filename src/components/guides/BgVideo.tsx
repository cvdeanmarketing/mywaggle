"use client";

import { useEffect, useRef } from "react";

/** Muted looping background video. Stays on its poster frame when the visitor prefers reduced motion. */
export function BgVideo({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      v.pause();
  }, []);
  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={`/videos/rving/${name}.jpg`}
      aria-hidden
    >
      <source src={`/videos/rving/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
