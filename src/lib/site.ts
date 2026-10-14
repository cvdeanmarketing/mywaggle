export const SITE = {
  name: "Waggle",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mywaggle.com").replace(/\/$/, ""),
  tagline: "Protect What Matters. Wherever Life Takes You.",
  description:
    "Waggle makes connected pet safety technology: 4G temperature monitors, WiFi and cellular pet cameras, and RV solutions that keep you connected to your pets, home and adventures.",
  phone: "855-983-5566",
  email: "support@mywaggle.com",
  /** Store policies as shown in the live site's trust bar. */
  policies: {
    shipping: "Free shipping",
    returns: "21-day returns",
    warranty: "Lifetime limited warranty",
    support: "24/7 chat support",
  },
  /** Brand stats published on the live homepage. Attributed as Waggle-reported. */
  stats: [
    { value: "100K+", label: "Pet parents" },
    { value: "1,700+", label: "Amazon ratings" },
    { value: "20+", label: "Years of protection" },
    { value: "9M+", label: "Social family" },
  ],
  amazonStore: "https://www.amazon.com/stores/Waggle/page/A049B7DE-7865-43EB-B361-F520DB0AF5A6",
  press: ["Dogster", "Catster", "Dog Gear Review", "The Wayward Home", "The Dyrt", "Harvest Hosts", "FMCA"],
  commerceMode: (process.env.NEXT_PUBLIC_COMMERCE_MODE ?? "demo") as "demo",
};

export function absoluteUrl(path = "/"): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
