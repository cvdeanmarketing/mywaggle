"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import {
  CAPABILITY_LABELS,
  CONNECTIVITY_LABELS,
  getProduct,
  sortProducts,
  type Capability,
  type Connectivity,
  type Product,
  type SortKey,
} from "@/lib/catalog";
import { cn } from "@/lib/format";
import { ProductCard } from "@/components/product/ProductCard";
import { ViewItemList } from "@/components/product/ViewItemList";

const FEATURE_FILTERS: Capability[] = [
  "temperature",
  "live-video",
  "two-way-audio",
  "gps-geofence",
  "battery-powered",
  "solar-option",
  "treat-tossing",
  "driving-visibility",
];
const CONN_FILTERS: Connectivity[] = [
  "cellular",
  "wifi",
  "satellite",
  "local-wireless",
];
const KINDS = [
  { value: "device", label: "Devices" },
  { value: "bundle", label: "Bundles" },
  { value: "accessory", label: "Accessories" },
] as const;

export function ShopGrid({
  handles,
  listName,
}: {
  handles: string[];
  listName: string;
}) {
  const products = handles
    .map(getProduct)
    .filter((p): p is Product => Boolean(p));
  const [sort, setSort] = useState<SortKey>("featured");
  const [noWifi, setNoWifi] = useState(false);
  const [conn, setConn] = useState<Connectivity[]>([]);
  const [features, setFeatures] = useState<Capability[]>([]);
  const [kinds, setKinds] = useState<string[]>([]);
  const [panel, setPanel] = useState(false);

  const availableConn = CONN_FILTERS.filter((c) =>
    products.some((p) => p.connectivity.includes(c)),
  );
  const availableFeatures = FEATURE_FILTERS.filter((f) =>
    products.some((p) => p.capabilities.includes(f)),
  );
  const availableKinds = KINDS.filter((k) =>
    products.some((p) => p.kind === k.value),
  );

  const filtered = sortProducts(
    products.filter(
      (p) =>
        (!noWifi ||
          (p.connectivity.length > 0 && !p.connectivity.includes("wifi"))) &&
        (conn.length === 0 || conn.some((c) => p.connectivity.includes(c))) &&
        (features.length === 0 ||
          features.every((f) => p.capabilities.includes(f))) &&
        (kinds.length === 0 || kinds.includes(p.kind)),
    ),
    sort,
  );

  const activeCount =
    conn.length + features.length + kinds.length + (noWifi ? 1 : 0);
  const toggle = <T,>(arr: T[], set: (v: T[]) => void, v: T) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const clear = () => {
    setConn([]);
    setFeatures([]);
    setKinds([]);
    setNoWifi(false);
  };

  const Filters = (
    <div className="space-y-7">
      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl bg-sand p-4">
        <span>
          <span className="block font-bold">Works without WiFi</span>
          <span className="text-xs text-muted">
            Built-in 4G or direct wireless
          </span>
        </span>
        <input
          type="checkbox"
          checked={noWifi}
          onChange={(e) => setNoWifi(e.target.checked)}
          className="size-5 accent-ink"
        />
      </label>
      {availableKinds.length > 1 && (
        <fieldset>
          <legend className="text-sm font-bold">Type</legend>
          <div className="mt-3 space-y-2">
            {availableKinds.map((k) => (
              <label
                key={k.value}
                className="flex cursor-pointer items-center gap-3 text-sm"
              >
                <input
                  type="checkbox"
                  checked={kinds.includes(k.value)}
                  onChange={() => toggle(kinds, setKinds, k.value)}
                  className="size-4 accent-ink"
                />
                {k.label}
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <fieldset>
        <legend className="text-sm font-bold">Connectivity</legend>
        <div className="mt-3 space-y-2">
          {availableConn.map((c) => (
            <label
              key={c}
              className="flex cursor-pointer items-center gap-3 text-sm"
            >
              <input
                type="checkbox"
                checked={conn.includes(c)}
                onChange={() => toggle(conn, setConn, c)}
                className="size-4 accent-ink"
              />
              {CONNECTIVITY_LABELS[c]}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-sm font-bold">Features</legend>
        <div className="mt-3 space-y-2">
          {availableFeatures.map((f) => (
            <label
              key={f}
              className="flex cursor-pointer items-center gap-3 text-sm"
            >
              <input
                type="checkbox"
                checked={features.includes(f)}
                onChange={() => toggle(features, setFeatures, f)}
                className="size-4 accent-ink"
              />
              {CAPABILITY_LABELS[f]}
            </label>
          ))}
        </div>
      </fieldset>
      {activeCount > 0 && (
        <button
          type="button"
          onClick={clear}
          className="text-sm font-bold text-signal hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
      <ViewItemList listName={listName} handles={handles} />
      <aside className="hidden lg:block" aria-label="Filters">
        <div className="sticky top-36">{Filters}</div>
      </aside>

      <div>
        <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
          <p
            className="whitespace-nowrap text-sm text-muted"
            aria-live="polite"
          >
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPanel(true)}
              className="btn-secondary px-4 py-2 text-sm lg:hidden"
            >
              <SlidersHorizontal className="size-4" aria-hidden /> Filters
              {activeCount ? ` (${activeCount})` : ""}
            </button>
            <label htmlFor="sort" className="sr-only">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="field w-auto py-2 pr-8 text-sm font-bold"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display text-xl font-semibold">
              No products match those filters.
            </p>
            <button
              type="button"
              onClick={clear}
              className="btn-secondary mt-5"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p, i) => (
              <li key={p.handle}>
                <ProductCard
                  product={p}
                  listName={listName}
                  index={i}
                  className="h-full"
                  priority={i < 3}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {panel && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
        >
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setPanel(false)}
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-paper p-6">
            <div className="mb-6 flex items-center justify-between">
              <p className="font-display text-xl font-semibold">Filters</p>
              <button
                type="button"
                onClick={() => setPanel(false)}
                className="inline-flex size-10 items-center justify-center rounded-full hover:bg-sand"
                aria-label="Close filters"
              >
                <X className="size-5" />
              </button>
            </div>
            {Filters}
            <button
              type="button"
              onClick={() => setPanel(false)}
              className={cn("btn-primary mt-8 w-full")}
            >
              Show {filtered.length}{" "}
              {filtered.length === 1 ? "product" : "products"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
