import type { CategorySlug } from "@/lib/catalog";

export interface NavItem {
  label: string;
  href: string;
  /** Category whose products fill the mega menu panel. */
  category?: CategorySlug;
  blurb?: string;
  /** Shorter label used where the top menu is tight (below 1280px). */
  short?: string;
  /** Plain link list (used instead of product tiles). The first entry is always "View all". */
  links?: { label: string; href: string }[];
}

export const PRIMARY_NAV: NavItem[] = [
  {
    label: "Shop All",
    href: "/shop",
    blurb: "Monitors, cameras, bundles and accessories.",
  },
  {
    label: "Pet Safety",
    href: "/shop/pet-safety",
    category: "pet-safety",
    blurb: "Temperature, humidity and power-loss alerts over built-in 4G.",
  },
  {
    label: "Pet Cameras",
    href: "/shop/pet-cameras",
    category: "pet-cameras",
    blurb: "WiFi and 4G cameras to see and talk to your pet.",
  },
  {
    label: "RV Solutions",
    short: "RV",
    href: "/shop/rv-solutions",
    category: "rv-solutions",
    blurb: "Pet safety, cameras and driving visibility for your rig.",
  },
  {
    label: "Travel & Adventure",
    short: "Travel",
    href: "/shop/travel-adventure",
    category: "travel-adventure",
    blurb: "Monitoring that comes along on every trip.",
  },
  {
    label: "Home & Property",
    short: "Home",
    href: "/shop/home-property",
    category: "home-property",
    blurb: "Indoor cameras and no-WiFi options for cabins and property.",
  },
  {
    label: "Bundles",
    href: "/bundles",
    category: "bundles",
    blurb: "Published bundles, or build your own.",
  },
  {
    label: "Wag Reads",
    href: "/learn",
    blurb: "Stories, guides and safety know-how for pet parents.",
    links: [
      { label: "All blogs", href: "/learn" },
      { label: "RVing with Pets", href: "/learn/section/rving-with-pets" },
      { label: "Heatstroke in Pets", href: "/learn/section/heatstroke" },
      { label: "Pet Guides", href: "/learn/section/pet-guides" },
      {
        label: "Waggle Saves Lives",
        href: "/saves-lives",
      },
      { label: "Pet Travel Videos", href: "/videos" },
    ],
  },
  {
    label: "Partner with Us",
    short: "Partner",
    href: "/partners",
    blurb: "Earn, represent and grow with Waggle.",
    links: [
      { label: "Partners Program", href: "/partners" },
      { label: "Refer & Earn", href: "/refer" },
      { label: "Ambassador Program", href: "/ambassador" },
      { label: "Waggle Alpha Program", href: "/alpha" },
      { label: "Business partners", href: "/partners#business" },
      { label: "RV Events", href: "/events" },
      { label: "Waggle Live Sessions", href: "/live" },
    ],
  },
];

export const FOOTER_NAV = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/shop" },
      { label: "Pet safety monitors", href: "/shop/pet-safety" },
      { label: "Pet cameras", href: "/shop/pet-cameras" },
      { label: "No WiFi? No problem", href: "/shop/no-wifi" },
      { label: "RV solutions", href: "/shop/rv-solutions" },
      { label: "Bundles", href: "/bundles" },
      { label: "Compare devices", href: "/compare" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Find Your Waggle", href: "/find-your-waggle" },
      { label: "Cellular vs. WiFi", href: "/learn/cellular-vs-wifi" },
      { label: "Subscription plans", href: "/plans" },
      { label: "Pet heat safety", href: "/learn/pet-heat-safety" },
      { label: "Wag Reads", href: "/learn" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Blogs", href: "/learn" },
      { label: "Pet Guide", href: "/learn/section/pet-guides" },
      { label: "Subscription Plans", href: "/plans" },
      { label: "Waggle Advisory Board", href: "/advisory-board" },
      { label: "Return Policy", href: "/returns" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Partner with Waggle",
    links: [
      { label: "Refer a friend", href: "/refer" },
      { label: "Ambassadors", href: "/ambassador" },
      { label: "Waggle Alpha", href: "/alpha" },
      { label: "Business partners", href: "/partners#business" },
      { label: "RV Events", href: "/events" },
      { label: "Waggle for Good", href: "/waggle-for-good" },
    ],
  },
];
