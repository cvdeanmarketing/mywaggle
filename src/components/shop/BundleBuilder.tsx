"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Info, Plus } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { bundles, devices, getPlan, priceOf, CONNECTIVITY_LABELS, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { track } from "@/lib/analytics";
import { cn, money } from "@/lib/format";
import { ProductArt } from "@/components/product/ProductArt";

const GROUPS: { title: string; note: string; filter: (p: Product) => boolean }[] = [
  { title: "Safety monitors", note: "Temperature, humidity and power alerts", filter: (p) => p.capabilities.includes("temperature") },
  { title: "Cameras", note: "WiFi or built-in 4G", filter: (p) => p.capabilities.includes("live-video") && !p.capabilities.includes("driving-visibility") },
  { title: "Driving visibility", note: "For backing up and towing", filter: (p) => p.capabilities.includes("driving-visibility") },
];

/** A published bundle applies only when the selection matches its contents exactly. */
function matchPublished(selected: string[]): Product | undefined {
  const key = [...selected].sort().join("|");
  return bundles().find((b) => [...(b.includes ?? [])].sort().join("|") === key);
}

export function BundleBuilder({ initial = [] as string[] }: { initial?: string[] }) {
  const [selected, setSelected] = useState<string[]>(initial);
  const { add, addMany } = useCart();
  const all = devices();

  const items = useMemo(() => selected.map((h) => all.find((p) => p.handle === h)!).filter(Boolean), [selected, all]);
  const itemsTotal = items.reduce((s, p) => s + priceOf(p), 0);
  const published = matchPublished(selected);
  const bundlePrice = published ? priceOf(published) : undefined;
  const savings = bundlePrice !== undefined ? itemsTotal - bundlePrice : 0;
  const needsWifi = items.some((p) => p.connectivity.includes("wifi"));
  const plans = items
    .map((p) => ({ p, plan: getPlan(p.planId) }))
    .filter((x) => x.plan);
  const requiredYearly = plans.reduce((s, { plan }) => {
    if (plan!.requirement !== "required") return s;
    return s + (plan!.options.find((o) => o.interval === "year")?.price ?? 0);
  }, 0);

  const toggle = (h: string) => setSelected((s) => (s.includes(h) ? s.filter((x) => x !== h) : [...s, h]));

  const addToCart = () => {
    if (items.length === 0) return;
    track("bundle_created", {
      bundle_items: selected.join(","),
      bundle_size: selected.length,
      matched_bundle: published?.handle ?? null,
      value: bundlePrice ?? itemsTotal,
      currency: "USD",
    });
    if (published && savings > 0) add(published.handle);
    else addMany(selected);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="space-y-8">
        {GROUPS.map((g) => (
          <fieldset key={g.title}>
            <legend className="flex items-baseline gap-3">
              <span className="font-display text-xl font-semibold">{g.title}</span>
              <span className="text-sm text-muted">{g.note}</span>
            </legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {all.filter(g.filter).map((p) => {
                const on = selected.includes(p.handle);
                return (
                  <button
                    key={p.handle}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(p.handle)}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-2xl border bg-paper p-3 pr-4 text-left transition-all",
                      on ? "border-ink ring-1 ring-ink" : "border-line hover:border-ink/40",
                    )}
                  >
                    <span className="size-20 shrink-0 overflow-hidden rounded-xl bg-sand">
                      <ProductArt art={p.art} title="" className="size-full" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold leading-snug">{p.name}</span>
                      <span className="mt-0.5 block text-xs text-muted">{p.connectivity.map((c) => CONNECTIVITY_LABELS[c]).join(" + ")}</span>
                      <span className="mt-1 block text-sm font-bold">{money(priceOf(p))}</span>
                    </span>
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors",
                        on ? "border-ink bg-ink text-paper" : "border-line text-ink group-hover:border-ink",
                      )}
                      aria-hidden
                    >
                      {on ? <Check className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Your bundle">
        <div className="rounded-[24px] bg-ink p-6 text-paper">
          <p className="font-display text-xl font-semibold">Your bundle</p>
          <div className="mt-4 flex min-h-[88px] items-end">
            <AnimatePresence initial={false}>
              {items.length === 0 ? (
                <motion.p key="empty" className="text-sm text-muted-dark" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Pick two or more devices to build a setup that works together in one app.
                </motion.p>
              ) : (
                items.map((p, i) => (
                  <motion.span
                    key={p.handle}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={cn("size-[88px] shrink-0 overflow-hidden rounded-2xl border-2 border-ink bg-sand", i > 0 && "-ml-5")}
                  >
                    <ProductArt art={p.art} title={p.name} className="size-full" />
                  </motion.span>
                ))
              )}
            </AnimatePresence>
          </div>

          {items.length > 0 && (
            <ul className="mt-5 space-y-2 border-t border-line-dark pt-4 text-sm">
              {items.map((p) => (
                <li key={p.handle} className="flex justify-between gap-3">
                  <span className="text-muted-dark">{p.name}</span>
                  <span className="font-bold">{money(priceOf(p))}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 border-t border-line-dark pt-4">
            {published && savings > 0 ? (
              <>
                <p className="flex items-center gap-2 text-sm font-bold text-[#7fd1a8]">
                  <Check className="size-4" aria-hidden /> Matches the {published.name}
                </p>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-sm text-muted-dark">Bundle price</span>
                  <span className="font-display text-3xl font-semibold">
                    {money(bundlePrice!)} <span className="text-base text-muted-dark line-through">{money(itemsTotal)}</span>
                  </span>
                </div>
                <p className="mt-1 text-right text-xs text-muted-dark">Published bundle price · you save {money(savings)}</p>
              </>
            ) : (
              <>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-dark">Total</span>
                  <span className="font-display text-3xl font-semibold">{money(itemsTotal)}</span>
                </div>
                {items.length >= 2 && (
                  <p className="mt-1 text-xs leading-snug text-muted-dark">
                    No published bundle matches this combination, so individual prices apply. See <Link href="/bundles#published" className="underline">published bundles</Link>.
                  </p>
                )}
              </>
            )}
          </div>

          {plans.length > 0 && (
            <div className="mt-4 rounded-2xl bg-ink-2 p-4 text-xs leading-relaxed text-muted-dark">
              <p className="mb-1 flex items-center gap-1.5 font-bold text-paper">
                <Info className="size-3.5" aria-hidden /> Plans after purchase
              </p>
              {plans.map(({ p, plan }) => (
                <p key={p.handle}>
                  {p.name}: {plan!.requirement === "required" ? "required" : "optional"}
                  {plan!.options.find((o) => o.interval === "year") ? `, ${money(plan!.options.find((o) => o.interval === "year")!.price)}/yr` : ", price at activation"}
                </p>
              ))}
              {requiredYearly > 0 && <p className="mt-1 font-bold text-paper">Required plans from {money(requiredYearly)}/yr</p>}
              {needsWifi && <p className="mt-1">WiFi cameras need a reliable WiFi network.</p>}
            </div>
          )}

          <button type="button" onClick={addToCart} disabled={items.length === 0} className="btn mt-5 w-full bg-paper text-ink hover:bg-sand">
            Add {items.length > 1 ? "bundle" : "to cart"}
            {items.length > 0 ? ` · ${money(bundlePrice !== undefined && savings > 0 ? bundlePrice : itemsTotal)}` : ""}
          </button>
        </div>
      </aside>
    </div>
  );
}
