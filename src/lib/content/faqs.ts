import type { FaqItem } from "@/lib/catalog";

export const HOME_FAQS: FaqItem[] = [
  {
    q: "What does Waggle make?",
    a: "Connected pet safety technology: 4G temperature and power-loss monitors, WiFi pet cameras for home, 4G cameras for places without WiFi, and an RV observation camera system. Everything runs in one Waggle app.",
  },
  {
    q: "Do I need WiFi?",
    a: "Not for Waggle's pet monitors or 4G cameras. They have a built-in cellular connection. WaggleCam Pro and the RV WiFi Mini Cam do need reliable WiFi.",
  },
  {
    q: "Do Waggle devices need a subscription?",
    a: "Cellular devices need a plan, one per device, because the plan pays for the built-in data connection. Plan prices are shown on every product page and in your cart before checkout. WiFi cameras work without a plan, and cloud features are optional.",
  },
  {
    q: "Can I use more than one Waggle device together?",
    a: "Yes. Monitors and cameras all appear in the same Waggle app. A common setup is a 4G temperature monitor plus a camera, and published bundles price those together.",
  },
  {
    q: "What's the difference between Pet Monitor Lite+ and Pro+?",
    a: "Both send temperature, humidity and power-loss alerts over 4G. Pro+ adds a GPS geofence (RVSentry), an on-device display and hub mode for Waggle smart sensors.",
  },
  {
    q: "What are your shipping and return policies?",
    a: "Waggle offers free shipping, 21-day returns, a lifetime limited warranty and 24/7 chat support.",
  },
];

export const PLANS_FAQS: FaqItem[] = [
  { q: "Can I use my own phone plan?", a: "No. Waggle cellular devices use Waggle's built-in service, and your existing cellular account can't be linked." },
  { q: "Can I cancel?", a: "Waggle's FAQ says you can cancel anytime, with service continuing until the end of the billing cycle." },
  { q: "Do I need one plan per device?", a: "Yes. Each cellular device has its own built-in connection and its own plan." },
  { q: "Are plans charged at checkout?", a: "No. Plans are activated and billed through the Waggle app after your device arrives. This storefront shows them before you buy so there are no surprises." },
];
