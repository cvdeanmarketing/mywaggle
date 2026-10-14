/**
 * Partner, ambassador and referral program terms.
 *
 * PENDING FINANCE REVIEW. These values drive the /partners page and are the
 * single place to change program economics. Nothing here is charged or paid
 * by this prototype.
 *
 * Proposed structure (replaces three overlapping programs on the live site):
 *  - New referrers and ambassadors earn a commission on the referred order's
 *    hardware subtotal. One referral link per person, one payout per order.
 *  - Existing referrers keep the legacy flat reward (grandfathered).
 *  - Rewards are only earned after the return window closes and the referred
 *    customer's required plan is active, so returned orders never pay out.
 */
export const REFERRAL_TERMS = {
  status: "proposed" as const,
  /** Proposed commission for new referrers. Set by finance. */
  commissionRate: 0.1,
  commissionBase:
    "hardware subtotal, before tax and shipping, excluding subscriptions",
  legacyFlatReward: 50,
  legacyNote:
    "Referrers enrolled before the program change keep the $50 flat reward per qualifying referral.",
  returnWindowDays: 21,
  qualifying: [
    "The referred friend is a new Waggle customer.",
    "The order includes at least one Waggle device (accessories alone don't qualify).",
    "The 21-day return window has closed without a return.",
    "The friend's required plan is active.",
  ],
  noStacking:
    "One reward per order. Ambassador and referral links share one system, so an order can't earn twice.",
};

export const PARTNER_TRACKS = [
  {
    id: "refer",
    name: "Refer a Friend",
    audience: "Waggle customers",
    summary:
      "Share your link with a friend who'd want to know their pet is safe. Earn a commission on their first device order once it's final.",
    perks: [
      "Personal referral link",
      "Commission on qualifying orders",
      "Track referrals in your account",
    ],
    cta: "Get my referral link",
  },
  {
    id: "ambassador",
    name: "Ambassadors",
    audience: "RVers, pet professionals, campground hosts and creators",
    summary:
      "Represent Waggle at campgrounds, pet shows and meetups, and help people travel more safely with their pets. No follower minimum.",
    perks: [
      "Event and education kits",
      "Early access to new products",
      "Same commission on your referral link",
    ],
    cta: "Apply to be an ambassador",
  },
  {
    id: "alpha",
    name: "Waggle Alpha",
    audience: "Pet parents who want to shape what's next",
    summary:
      "Test new Waggle products before launch and give feedback that shapes what ships. A product program, not a payout program.",
    perks: [
      "Early access to pre-release products",
      "Direct line to the product team",
      "Help build safer tech for pets",
    ],
    cta: "Join Waggle Alpha",
  },
  {
    id: "business",
    name: "Business Partners",
    audience: "Retailers, resellers, wholesalers and brands",
    summary:
      "Carry Waggle in your store, or collaborate on pet-safety education and co-marketing.",
    perks: [
      "Wholesale and reseller terms",
      "Co-marketing and content",
      "Dedicated partner contact",
    ],
    cta: "Talk to partnerships",
  },
] as const;

/** Ambassador tiers from the live program. Tiers change perks and opportunities, never the commission rate. */
export const AMBASSADOR_TIERS = [
  {
    name: "Explorer",
    summary:
      "Start your journey. Earn points and access foundational perks and community support.",
  },
  {
    name: "Crew",
    summary:
      "Recognized contributor. Unlock collaboration tools and featured content opportunities.",
  },
  {
    name: "Elite",
    summary:
      "Official Waggle Representative. Premium collaborations, event support, sponsorships and spotlight features. Limited spots each quarter.",
  },
];

export const AMBASSADOR_ACTIVITIES = [
  "Share real RV, travel and pet-life experiences",
  "Talk about how you protect your pets: at home, on the road or at events",
  "Recommend Waggle when it genuinely fits the conversation",
];
