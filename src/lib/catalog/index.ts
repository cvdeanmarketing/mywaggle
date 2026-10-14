import { categories, getCategory } from "./categories";
import { getPlan, plans, yearlyCost } from "./plans";
import { products } from "./products";
import type { Capability, CategorySlug, Product } from "./types";

export * from "./types";
export { categories, getCategory, getPlan, plans, products, yearlyCost };
export { planPricing, perDayLabel, SUITE_SERVICES } from "./plans";

export function getProduct(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function priceOf(product: Product): number {
  return product.variants[0]?.price.amount ?? 0;
}

export function compareAtOf(product: Product): number | undefined {
  return product.variants[0]?.price.compareAt;
}

export const devices = () => products.filter((p) => p.kind === "device");
export const bundles = () => products.filter((p) => p.kind === "bundle");
export const accessories = () => products.filter((p) => p.kind === "accessory");

export function productsInCategory(slug: CategorySlug): Product[] {
  return products
    .filter((p) => p.categories.includes(slug))
    .sort((a, b) => a.merchRank - b.merchRank);
}

export function bestsellers(limit = 4): Product[] {
  return devices()
    .slice()
    .sort((a, b) => a.merchRank - b.merchRank)
    .slice(0, limit);
}

export function relatedProducts(product: Product): Product[] {
  return product.related
    .map(getProduct)
    .filter((p): p is Product => Boolean(p));
}

export function hasCapability(product: Product, cap: Capability): boolean {
  return product.capabilities.includes(cap);
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "name";

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = list.slice();
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => priceOf(a) - priceOf(b));
    case "price-desc":
      return copy.sort((a, b) => priceOf(b) - priceOf(a));
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return copy.sort((a, b) => a.merchRank - b.merchRank);
  }
}

/** Simple, dependency-free search over names, taglines, use cases and capabilities. */
export function searchProducts(query: string): Product[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return products
    .map((p) => {
      const hay = [
        p.name,
        p.tagline,
        p.description,
        ...p.useCases,
        ...p.capabilities,
        ...p.connectivity,
        ...p.categories,
      ]
        .join(" ")
        .toLowerCase()
        .replace(/-/g, " ");
      const score = terms.reduce(
        (s, t) =>
          s +
          (hay.includes(t) ? (p.name.toLowerCase().includes(t) ? 3 : 1) : 0),
        0,
      );
      return { p, score };
    })
    .filter((r) => r.score >= terms.length)
    .sort((a, b) => b.score - a.score || a.p.merchRank - b.p.merchRank)
    .map((r) => r.p);
}

export const CAPABILITY_LABELS: Record<Capability, string> = {
  temperature: "Temperature alerts",
  humidity: "Humidity",
  "power-loss-alerts": "Power-loss alerts",
  "gps-geofence": "GPS geofence",
  "on-device-display": "On-device display",
  "sensor-hub": "Smart sensor hub",
  "satellite-alerts": "Satellite-backed alerts",
  "live-video": "Live video",
  "two-way-audio": "Two-way audio",
  "night-vision": "Night vision",
  "pan-tilt-tracking": "Pan, tilt & tracking",
  "treat-tossing": "Treat tossing",
  "battery-powered": "Battery powered",
  "solar-option": "Solar power",
  "weather-resistant": "Weather resistant",
  "local-recording": "Local SD recording",
  "driving-visibility": "Driving visibility",
};

export const CONNECTIVITY_LABELS = {
  cellular: "Built-in 4G",
  wifi: "WiFi",
  satellite: "Satellite backup",
  "local-wireless": "Direct wireless",
} as const;
