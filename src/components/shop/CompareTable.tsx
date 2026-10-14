"use client";

import { Check, Minus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CAPABILITY_LABELS, CONNECTIVITY_LABELS, devices, getPlan, perDayLabel, planPricing, priceOf, type Capability, type Product } from "@/lib/catalog";
import { track } from "@/lib/analytics";
import { cn, money } from "@/lib/format";
import { ProductArt } from "@/components/product/ProductArt";

const ROWS: Capability[] = [
  "temperature",
  "power-loss-alerts",
  "gps-geofence",
  "satellite-alerts",
  "live-video",
  "two-way-audio",
  "pan-tilt-tracking",
  "treat-tossing",
  "battery-powered",
  "weather-resistant",
  "driving-visibility",
];

function PlanCell({ p }: { p: Product }) {
  const plan = getPlan(p.planId);
  if (!plan) return <>None listed</>;
  const y = plan.options.find((o) => o.interval === "year");
  const label = plan.requirement === "optional" ? "Optional" : "Required";
  const { perDay } = planPricing(plan);
  return (
    <>
      {y ? `${label} · ${money(y.price)}/yr` : label}
      {y && perDay ? <span className="mt-0.5 block text-xs text-muted">{perDayLabel(perDay)}</span> : null}
    </>
  );
}

export function CompareTable({ handles, selectable = true }: { handles?: string[]; selectable?: boolean }) {
  const all = devices().sort((a, b) => a.merchRank - b.merchRank);
  const [chosen, setChosen] = useState<string[]>(handles ?? all.slice(0, 4).map((p) => p.handle));
  const cols = chosen.map((h) => all.find((p) => p.handle === h)!).filter(Boolean);

  useEffect(() => {
    if (cols.length >= 2) track("product_compared", { items_compared: chosen.join(","), item_count: chosen.length });
    // Report only when the selection changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosen.join(",")]);

  return (
    <div>
      {selectable && (
        <fieldset className="mb-6">
          <legend className="text-sm font-bold">Choose up to 4 devices</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {all.map((p) => {
              const on = chosen.includes(p.handle);
              const disabled = !on && chosen.length >= 4;
              return (
                <button
                  key={p.handle}
                  type="button"
                  aria-pressed={on}
                  disabled={disabled}
                  onClick={() => setChosen((c) => (on ? c.filter((x) => x !== p.handle) : [...c, p.handle]))}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors disabled:opacity-40",
                    on ? "border-ink bg-ink text-paper" : "border-line bg-paper hover:border-ink",
                  )}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
          <caption className="sr-only">Waggle device comparison</caption>
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 z-10 w-44 bg-paper p-3 text-left align-bottom text-xs font-bold uppercase tracking-wider text-muted">
                Feature
              </th>
              {cols.map((p) => (
                <th key={p.handle} scope="col" className="p-3 text-left align-bottom">
                  <Link href={`/products/${p.handle}`} className="group block">
                    <span className="block aspect-square w-full max-w-[140px] overflow-hidden rounded-2xl bg-sand">
                      <ProductArt art={p.art} title="" className="size-full transition-transform group-hover:scale-105" />
                    </span>
                    <span className="mt-3 block font-display text-base font-semibold group-hover:underline">{p.name}</span>
                    <span className="mt-0.5 block font-bold">{money(priceOf(p))}</span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="sticky left-0 z-10 border-t border-line bg-paper p-3 text-left font-bold">Connects via</th>
              {cols.map((p) => (
                <td key={p.handle} className="border-t border-line p-3">{p.connectivity.map((c) => CONNECTIVITY_LABELS[c]).join(" + ")}</td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="sticky left-0 z-10 border-t border-line bg-paper p-3 text-left font-bold">Works without WiFi</th>
              {cols.map((p) => (
                <td key={p.handle} className="border-t border-line p-3">
                  {p.connectivity.includes("wifi") ? <span className="text-muted">No</span> : <span className="font-bold text-mint">Yes</span>}
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="sticky left-0 z-10 border-t border-line bg-paper p-3 text-left font-bold">Plan</th>
              {cols.map((p) => (
                <td key={p.handle} className="border-t border-line p-3"><PlanCell p={p} /></td>
              ))}
            </tr>
            {ROWS.filter((r) => cols.some((p) => p.capabilities.includes(r))).map((r) => (
              <tr key={r}>
                <th scope="row" className="sticky left-0 z-10 border-t border-line bg-paper p-3 text-left font-normal text-muted">
                  {CAPABILITY_LABELS[r]}
                </th>
                {cols.map((p) => (
                  <td key={p.handle} className="border-t border-line p-3">
                    {p.capabilities.includes(r) ? (
                      <Check className="size-5 text-ink" aria-label="Yes" />
                    ) : (
                      <Minus className="size-5 text-line" aria-label="No" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
