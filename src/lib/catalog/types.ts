/**
 * Typed catalog model.
 *
 * Every price, plan and spec that came from a public Waggle page carries a
 * `status` and its `sources`. Waggle's own pages publish conflicting numbers
 * for several products; those are marked "conflicting" so the UI can say so
 * and the merchandising team knows what to confirm before launch.
 *
 * The shape intentionally mirrors what a Shopify Storefront API product
 * exposes (handle, variants, compareAtPrice, images) so a real commerce
 * provider can map onto it without touching the UI.
 */

export type VerificationStatus =
  /** Stated consistently on an official Waggle page. */
  | "verified"
  /** Official Waggle pages (or official vs. retail listings) disagree. */
  | "conflicting"
  /** Not published anywhere we could verify; must be confirmed before launch. */
  | "unverified";

export interface SourceRef {
  label: string;
  url: string;
}

export interface Fact<T> {
  value: T;
  status: VerificationStatus;
  note?: string;
  sources: SourceRef[];
}

export type CategorySlug =
  | "pet-safety"
  | "pet-cameras"
  | "travel-adventure"
  | "home-property"
  | "rv-solutions"
  | "no-wifi"
  | "bundles";

export type Connectivity = "cellular" | "wifi" | "satellite" | "local-wireless";

/** Capabilities drive the quiz, comparison table and filters. Only add one when a source supports it. */
export type Capability =
  | "temperature"
  | "humidity"
  | "power-loss-alerts"
  | "gps-geofence"
  | "on-device-display"
  | "sensor-hub"
  | "satellite-alerts"
  | "live-video"
  | "two-way-audio"
  | "night-vision"
  | "pan-tilt-tracking"
  | "treat-tossing"
  | "battery-powered"
  | "solar-option"
  | "weather-resistant"
  | "local-recording"
  | "driving-visibility";

export type ProductKind = "device" | "bundle" | "accessory";

/** Illustration used until official product photography is wired in. */
export type ArtKey =
  | "monitor-pro"
  | "monitor-lite"
  | "monitor-satellite"
  | "wagglecam-pro"
  | "wifi-mini-cam"
  | "mini-cam-4g"
  | "camera-4g"
  | "travelcam"
  | "observation-system"
  | "solar-panel"
  | "tripod"
  | "vacuum-mount"
  | "clamp-mount"
  | "bundle-home-and-roam"
  | "bundle-pet-scout"
  | "bundle-rv-4g-scout"
  | "bundle-rv-4g-scout-pro"
  | "bundle-roadsafe"
  | "bundle-rv-watch"
  | "bundle-anti-anxiety";

export interface ProductImage {
  /** Official asset URL (e.g. cdn.shopify.com). */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** "cover" for photos with their own background (fills the tile); default "contain" for cutouts. */
  fit?: "contain" | "cover";
}

export interface Price {
  amount: number;
  /** Only set when an official page shows a strike-through price. */
  compareAt?: number;
  currency: "USD";
  status: VerificationStatus;
  note?: string;
  sources: SourceRef[];
}

export interface Variant {
  id: string;
  title: string;
  price: Price;
  available: boolean;
}

export interface Feature {
  title: string;
  detail: string;
}

export interface Spec {
  label: string;
  value: string;
  status: VerificationStatus;
  note?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

/** Published review summary. Only set from a verified review source. */
export interface ReviewSummary {
  rating: number;
  count: number;
  source: string;
  sourceUrl: string;
}

export interface Product {
  handle: string;
  kind: ProductKind;
  name: string;
  /** Benefit-led headline for the product page. */
  headline: string;
  /** One line for cards. */
  tagline: string;
  description: string;
  badge?: "Best Seller" | "Most Popular" | "New Launch" | "Bundle";
  categories: CategorySlug[];
  connectivity: Connectivity[];
  /** Plain-English explanation of how it connects. */
  connectivityNote: string;
  capabilities: Capability[];
  useCases: string[];
  features: Feature[];
  specs: Spec[];
  variants: Variant[];
  /** Subscription plan id from plans.ts, or null if none is listed. */
  planId: string | null;
  compatibility: string[];
  /** For bundles: handles of included devices. */
  includes?: string[];
  /** Accessories and cross-sells. */
  related: string[];
  art: ArtKey;
  /** Official product photography. Empty until assets are supplied (see README). */
  images: ProductImage[];
  /** Lifestyle and in-use photography for the product page. */
  gallery?: ProductImage[];
  faqs: FaqItem[];
  reviews?: ReviewSummary;
  /** Canonical product URL on the current live store. */
  sourceUrl: string;
  sources: SourceRef[];
  /** Lower = shown earlier in "Bestsellers". Based on badges on the live homepage. */
  merchRank: number;
}

export interface PlanOption {
  label: string;
  price: number;
  interval: "month" | "6 months" | "year" | "2 years";
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  /** "required": device will not deliver remote alerts/video without it. */
  requirement: "required" | "optional";
  requirementNote: string;
  options: PlanOption[];
  trial?: string;
  includes: string[];
  status: VerificationStatus;
  note?: string;
  sources: SourceRef[];
}

export interface Category {
  slug: CategorySlug;
  name: string;
  navLabel: string;
  headline: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  /** Plain-English buying guidance shown on the category page. */
  guidance: string[];
}
