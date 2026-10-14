import type { CategorySlug } from "@/lib/catalog";

export interface NavItem {
  label: string;
  href: string;
  /** Category whose products fill the mega menu panel. */
  category?: CategorySlug;
  blurb?: string;
  /** Plain link list (used instead of product tiles). The first entry is always "View all". */
  links?: { label: string; href: string }[];
}

export const PRIMARY_NAV: NavItem[] = [
  { label: "Shop All", href: "/shop", blurb: "Monitors, cameras, bundles and accessories." },
  { label: "Pet Safety", href: "/shop/pet-safety", category: "pet-safety", blurb: "Temperature, humidity and power-loss alerts over built-in 4G." },
  { label: "Pet Cameras", href: "/shop/pet-cameras", category: "pet-cameras", blurb: "WiFi and 4G cameras to see and talk to your pet." },
  { label: "Travel & Adventure", href: "/shop/travel-adventure", category: "travel-adventure", blurb: "Monitoring that comes along on every trip." },
  { label: "Home & Property", href: "/shop/home-property", category: "home-property", blurb: "Indoor cameras and no-WiFi options for cabins and property." },
  { label: "RV Solutions", href: "/shop/rv-solutions", category: "rv-solutions", blurb: "Pet safety, cameras and driving visibility for your rig." },
  { label: "Bundles", href: "/bundles", category: "bundles", blurb: "Published bundles, or build your own." },
  {
    label: "Wag Reads",
    href: "/learn",
    blurb: "Stories, guides and safety know-how for pet parents.",
    // The live site's original Wag Reads pages, with the original "all blogs" page first.
    links: [
      { label: "All blogs", href: "https://mywaggle.com/pages/blogs" },
      { label: "RVing with Pets", href: "https://mywaggle.com/pages/rving-with-pets" },
      { label: "Heatstroke in Pets", href: "https://mywaggle.com/pages/heatstroke-in-dogs" },
      { label: "Pet Guides", href: "https://info.mywaggle.com/pet-guides.php" },
      { label: "Waggle Saves Lives", href: "https://info.mywaggle.com/share-your-story.php" },
      { label: "Pet Travel Videos", href: "https://mywaggle.com/pages/traveling-tails" },
      { label: "More guides from Waggle", href: "/learn" },
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
    title: "Partner with Waggle",
    links: [
      { label: "Refer a friend", href: "/partners#refer" },
      { label: "Ambassadors", href: "/partners#ambassador" },
      { label: "Waggle Alpha", href: "/partners#alpha" },
      { label: "Business partners", href: "/partners#business" },
    ],
  },
];
