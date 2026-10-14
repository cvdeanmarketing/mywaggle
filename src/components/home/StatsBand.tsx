"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

/** Waggle-reported totals (see SITE.stats). Digits roll like an odometer when the row scrolls into view. */
const STATS = [
  { value: "100K+", label: "Pet parents" },
  { value: "1,700+", label: "Amazon ratings" },
  { value: "20+", label: "Years of protection" },
  { value: "9M+", label: "Social family" },
];

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function Digit({ d, order, run }: { d: number; order: number; run: boolean }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden text-center leading-none" aria-hidden>
      <motion.span
        className="flex flex-col"
        initial={{ y: 0 }}
        animate={{ y: run ? `${-d}em` : 0 }}
        transition={{ duration: 1.1 + order * 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        {DIGITS.map((n) => (
          <span key={n} className="block h-[1em] leading-[1em]">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function Ticker({ value, run, reduce }: { value: string; run: boolean; reduce: boolean }) {
  if (reduce) return <span aria-hidden>{value}</span>;
  let order = 0;
  return (
    <span className="inline-flex h-[1em] items-center leading-none" aria-hidden>
      {value.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <Digit key={i} d={Number(ch)} order={order++} run={run} />
        ) : (
          <span key={i} className="inline-block leading-none">
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

export function StatsBand() {
  const ref = useRef<HTMLUListElement>(null);
  const run = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion() ?? false;
  return (
    <ul
      ref={ref}
      className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/10 pt-6 sm:grid-cols-4"
      aria-label="Waggle by the numbers"
    >
      {STATS.map((s) => (
        <li key={s.label} className="flex flex-col items-center text-center">
          <span className="sr-only">{s.value}</span>
          <span className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            <Ticker value={s.value} run={run} reduce={reduce} />
          </span>
          <span className="mt-1.5 text-xs font-bold uppercase tracking-[0.12em] text-muted sm:text-[13px]">{s.label}</span>
        </li>
      ))}
    </ul>
  );
}
