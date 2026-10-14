/**
 * Promotions. In production, codes are validated by the commerce provider
 * (Shopify discounts / Stripe promotion codes). Locally we only honor codes
 * that are publicly advertised on the live site.
 */
export interface Promotion {
  code: string;
  label: string;
  /** Fraction off the hardware subtotal. Never applies to subscriptions. */
  percentOff: number;
  source: string;
  note: string;
}

export const PROMOTIONS: Promotion[] = [
  {
    code: "SAVINGS10",
    label: "Extra 10% off",
    percentOff: 0.1,
    source: "Announcement bar on mywaggle.com (October 2026)",
    note: "Stacking with bundle pricing and expiry must be confirmed in the commerce provider before launch.",
  },
];

export function findPromotion(code: string): Promotion | undefined {
  return PROMOTIONS.find((p) => p.code === code.trim().toUpperCase());
}

/** Promotional modal config. Set `offerCode` to null to run it as email capture only. */
export const PROMO_MODAL = {
  enabled: true,
  offerCode: "SAVINGS10" as string | null,
  /** Show after this many seconds on site, or this much scroll depth, or exit intent. */
  minSecondsOnSite: 25,
  minScrollDepth: 0.45,
  exitIntent: true,
  /** Don't show again for this many days after dismissal. */
  dismissDays: 14,
  /** Never show more than once per session. */
  oncePerSession: true,
  /** Paths where an interruption would hurt conversion. */
  suppressOn: ["/checkout", "/cart"],
};
