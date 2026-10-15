"use client";

import { Check, Minus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CAPABILITY_LABELS,
  CONNECTIVITY_LABELS,
  devices,
  getPlan,
  perDayLabel,
  planPricing,
  priceOf,
  type Capability,
  type Product,
} from "@/lib/catalog";
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
      {y && perDay ? (
        <span className="mt-0.5 block text-xs font-semibold text-signal">
          {perDayLabel(perDay)}
        </span>
      ) : null}
    </>
  );
}

export function CompareTable({
  handles,
  selectable = true,
}: {
  handles?: string[];
  selectable?: boolean;
}) {
  const all = devices().sort((a, b) => a.merchRank - b.merchRank);
  const [chosen, setChosen] = useState<string[]>(
    handles ?? all.slice(0, 4).map((p) => p.handle),
  );
  const cols = chosen
    .map((h) => all.find((p) => p.handle === h)!)
    .filter(Boolean);

  useEffect(() => {
    if (cols.length >= 2)
      track("product_compared", {
        items_compared: chosen.join(","),
        item_count: chosen.length,
      });
    // Report only when the selection changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosen.join(",")]);

  return (
    <div>
      {selectable && (
        <fieldset className="mb-6">
          <legend className="text-sm font-bold">
            Choose up to 4 devices{" "}
            <span className="font-normal text-muted">
              ({chosen.length} of 4 selected)
            </span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {all.map((p) => {
              const on = chosen.includes(p.handle);
              return (
                <button
                  key={p.handle}
                  type="button"
                  aria-pressed={on}
                  onClick={() =>
                    setChosen((c) => {
                      if (on)
                        return c.length > 1
                          ? c.filter((x) => x !== p.handle)
                          : c;
                      // Full: swap out the earliest pick instead of ignoring the click.
                      return c.length >= 4
                        ? [...c.slice(1), p.handle]
                        : [...c, p.handle];
                    })
                  }
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors",
                    on
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-paper hover:border-ink",
                  )}
                >
                  {on && <Check className="size-3.5" aria-hidden />}
                  {p.name}
                </button>
              );
            })}
          </div>
          {chosen.length >= 4 && (
            <p className="mt-3 text-xs text-muted">
              Four selected. Picking another device swaps out the first one you
              chose.
            </p>
          )}
        </fieldset>
      )}

      <p className="mb-2 text-center text-xs font-semibold text-muted sm:hidden">
        Swipe to compare →
      </p>
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[620px] border-separate border-spacing-0 text-sm">
          <caption className="sr-only">Waggle device comparison</caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky left-0 z-20 w-[92px] border-r border-line bg-paper p-2 text-left align-middle text-[10px] sm:w-44 sm:border-r-0 sm:p-3 sm:align-bottom sm:text-xs font-bold uppercase tracking-wider text-muted"
              >
                Feature
              </th>
              {cols.map((p) => (
                <th
                  key={p.handle}
                  scope="col"
                  className="min-w-[150px] p-3 text-center align-bottom sm:text-left"
                >
                  <Link href={`/products/${p.handle}`} className="group block">
                    <span className="mx-auto block aspect-square w-full max-w-[112px] overflow-hidden rounded-2xl bg-sand sm:mx-0 sm:max-w-[140px]">
                      <ProductArt
                        art={p.art}
                        title=""
                        className="size-full transition-transform group-hover:scale-105"
                      />
                    </span>
                    <span className="mt-3 block font-display text-sm font-semibold leading-tight group-hover:underline sm:text-base">
                      {p.name}
                    </span>
                    <span className="mt-0.5 block font-bold">
                      {money(priceOf(p))}
                    </span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th
                scope="row"
                className="sticky left-0 z-20 border-r border-t border-line bg-paper p-2 text-left text-xs sm:border-r-0 sm:p-3 sm:text-sm font-bold"
              >
                Connects via
              </th>
              {cols.map((p) => (
                <td
                  key={p.handle}
                  className="border-t border-line p-3 text-center text-[13px] sm:text-left sm:text-sm"
                >
                  {p.connectivity
                    .map((c) => CONNECTIVITY_LABELS[c])
                    .join(" + ")}
                </td>
              ))}
            </tr>
            <tr>
              <th
                scope="row"
                className="sticky left-0 z-20 border-r border-t border-line bg-paper p-2 text-left text-xs sm:border-r-0 sm:p-3 sm:text-sm font-bold"
              >
                Works without WiFi
              </th>
              {cols.map((p) => (
                <td
                  key={p.handle}
                  className="border-t border-line p-3 text-center text-[13px] sm:text-left sm:text-sm"
                >
                  {p.connectivity.includes("wifi") ? (
                    <span className="text-muted">No</span>
                  ) : (
                    <span className="font-bold text-mint">Yes</span>
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <th
                scope="row"
                className="sticky left-0 z-20 border-r border-t border-line bg-paper p-2 text-left text-xs sm:border-r-0 sm:p-3 sm:text-sm font-bold"
              >
                Plan
              </th>
              {cols.map((p) => (
                <td
                  key={p.handle}
                  className="border-t border-line p-3 text-center text-[13px] sm:text-left sm:text-sm"
                >
                  <PlanCell p={p} />
                </td>
              ))}
            </tr>
            {ROWS.filter((r) =>
              cols.some((p) => p.capabilities.includes(r)),
            ).map((r) => (
              <tr key={r}>
                <th
                  scope="row"
                  className="sticky left-0 z-20 border-r border-t border-line bg-paper p-2 text-left text-xs sm:border-r-0 sm:p-3 sm:text-sm font-normal text-muted"
                >
                  {CAPABILITY_LABELS[r]}
                </th>
                {cols.map((p) => (
                  <td
                    key={p.handle}
                    className="border-t border-line p-3 text-center text-[13px] sm:text-left sm:text-sm"
                  >
                    {p.capabilities.includes(r) ? (
                      <Check
                        className="mx-auto size-5 text-ink sm:mx-0"
                        aria-label="Yes"
                      />
                    ) : (
                      <Minus
                        className="mx-auto size-5 text-line sm:mx-0"
                        aria-label="No"
                      />
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
