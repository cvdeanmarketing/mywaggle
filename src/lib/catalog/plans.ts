import { SRC } from "./sources";
import type { SubscriptionPlan } from "./types";

/** Services the live homepage says are "built into every Waggle subscription". */
export const SUITE_SERVICES = ["Waggle Vet (24/7 licensed vet access)", "Waggle Vault (pet health records)", "Waggle Places (pet-friendly stops)"];

export const plans: SubscriptionPlan[] = [
  {
    id: "cellular",
    name: "Waggle 4G Network Plan",
    requirement: "required",
    requirementNote:
      "Activates the device's built-in 4G connection. Without a plan the device cannot send alerts or stream to your phone. One plan per device. Your own phone plan can't be used.",
    options: [
      { label: "Monthly", price: 24.99, interval: "month" },
      { label: "Half-yearly", price: 119, interval: "6 months" },
      { label: "Yearly", price: 199, interval: "year" },
      { label: "2-year", price: 299, interval: "2 years" },
    ],
    includes: ["Built-in 4G data", "Text, email and app alerts", ...SUITE_SERVICES],
    status: "conflicting",
    note: "Support pages list Monthly $24.99. The subscription policy page lists Monthly $29.99. Yearly ($199) and 2-year ($299) match across pages.",
    sources: [SRC.subscription, SRC.subscriptionPolicy, SRC.networkPlan, SRC.faq],
  },
  {
    id: "cellular-camera",
    name: "Waggle 4G Camera Plan",
    requirement: "required",
    requirementNote:
      "Powers the camera's built-in SIM for live view and alerts. Without a plan the camera still records to its SD card, but you can't watch remotely or get alerts.",
    options: [
      { label: "Monthly", price: 24.99, interval: "month" },
      { label: "Yearly", price: 199, interval: "year" },
    ],
    trial: "3-day free trial, no credit card required",
    includes: ["Built-in 4G data", "Live view and motion alerts", ...SUITE_SERVICES],
    status: "verified",
    note: "Live product pages: 'free 3-day trial, then $24.99/mo or $199/yr. Cancel anytime.' Applies to RV 4G Mini Camera, RV 4G Camera and 4G TravelCam.",
    sources: [SRC.rv4gMini, SRC.rv4gMiniHelp, SRC.cameras],
  },
  {
    id: "satellite",
    name: "Pro+ Satellite Plan",
    requirement: "required",
    requirementNote:
      "Covers both cellular and satellite-backed critical alerts for the Pet Monitor Pro+ Satellite. It replaces the standard 4G plan for this device.",
    options: [{ label: "Yearly", price: 399, interval: "year" }],
    includes: ["Built-in 4G data", "Satellite backup for critical alerts", ...SUITE_SERVICES],
    status: "verified",
    sources: [SRC.shopCollection, SRC.petMonitor],
  },
  {
    id: "wagglecam-cloud",
    name: "WaggleCam Cloud Plan",
    requirement: "optional",
    requirementNote:
      "Optional. WaggleCam Pro streams over your home WiFi and records to an SD card without a plan. The plan adds cloud features.",
    options: [{ label: "Yearly", price: 59.99, interval: "year" }],
    trial: "30-day trial",
    includes: ["Cloud video features"],
    status: "conflicting",
    note: "Support page also shows a $9.99 short-term plan whose billing period isn't stated. Confirm plan tiers before launch.",
    sources: [SRC.wagglecamSub],
  },
  {
    id: "wifi-mini-cloud",
    name: "RV WiFi Mini Cam Cloud Plan",
    requirement: "optional",
    requirementNote:
      "Optional. The camera streams over WiFi and records to its SD card without a plan. Cloud storage is a paid add-on.",
    options: [{ label: "Starting at", price: 4.99, interval: "month" }],
    includes: ["Cloud video storage"],
    status: "verified",
    note: "Store lists plans from $4.99/mo. Exact tiers weren't shown.",
    sources: [SRC.rvMiniCamFaq],
  },
];

export function getPlan(id: string | null | undefined): SubscriptionPlan | undefined {
  if (!id) return undefined;
  return plans.find((p) => p.id === id);
}

/** Lowest published yearly cost, used to show "from $X/yr" next to prices. */
export function yearlyCost(plan: SubscriptionPlan | undefined): number | undefined {
  if (!plan) return undefined;
  const yearly = plan.options.find((o) => o.interval === "year");
  return yearly?.price;
}

export interface PlanPricing {
  /** Yearly price, shown first. */
  yearly?: number;
  /** Yearly price expressed per month. */
  yearlyPerMonth?: number;
  /** Yearly price expressed per day. */
  perDay?: number;
  monthly?: number;
}

/** Yearly-first pricing, with per-month and per-day equivalents. */
export function planPricing(plan: SubscriptionPlan | undefined): PlanPricing {
  if (!plan) return {};
  const yearly = plan.options.find((o) => o.interval === "year")?.price;
  const monthly = plan.options.find((o) => o.interval === "month")?.price;
  return {
    yearly,
    yearlyPerMonth: yearly ? Math.round((yearly / 12) * 100) / 100 : undefined,
    perDay: yearly ? Math.round((yearly / 365) * 100) / 100 : undefined,
    monthly,
  };
}

/** "about 55¢ a day" */
export function perDayLabel(perDay: number): string {
  return perDay < 1 ? `about ${Math.round(perDay * 100)}¢ a day` : `about $${perDay.toFixed(2)} a day`;
}
