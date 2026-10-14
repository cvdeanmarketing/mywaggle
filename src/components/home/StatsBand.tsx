"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Waggle-reported totals (see SITE.stats). `to` is the number the count-up lands on. */
const STATS = [
  { to: 100, suffix: "K+", label: "Pet parents" },
  { to: 1700, suffix: "+", label: "Amazon ratings" },
  { to: 20, suffix: "+", label: "Years of protection" },
  { to: 9, suffix: "M+", label: "Social family" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, to]);

  const final = `${to.toLocaleString("en-US")}${suffix}`;
  return (
    <span ref={ref}>
      <span className="sr-only">{final}</span>
      <span aria-hidden>
        {n.toLocaleString("en-US")}
        {suffix}
      </span>
    </span>
  );
}

export function StatsBand() {
  return (
    <section className="border-b border-line bg-paper" aria-label="Waggle by the numbers">
      <ul className="container-page grid grid-cols-2 gap-y-5 py-6 sm:grid-cols-4 sm:py-7">
        {STATS.map((s) => (
          <li key={s.label} className="text-center">
            <p className="font-display text-3xl font-semibold leading-none tabular-nums text-ink sm:text-4xl">
              <Counter to={s.to} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-muted">{s.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
