import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "pet-safety",
    name: "Pet Safety Monitors",
    navLabel: "Pet Safety",
    headline: "Know the moment it gets too hot, too cold, or the power goes out.",
    description:
      "Temperature, humidity and power-loss monitors with their own 4G connection. Alerts reach your phone by app, text and email, with no WiFi needed.",
    seoTitle: "Pet Temperature Monitors with 4G Alerts",
    seoDescription:
      "Waggle pet temperature monitors send app, text and email alerts over built-in 4G when temperature, humidity or power changes. No WiFi required.",
    guidance: [
      "Choose Lite+ for essential temperature, humidity and power-loss alerts.",
      "Choose Pro+ if you also want a GPS geofence, an on-device display and hub mode for smart sensors.",
      "Choose Pro+ Satellite if you travel beyond reliable cell coverage and need critical alerts to keep getting through.",
    ],
  },
  {
    slug: "pet-cameras",
    name: "Pet Cameras",
    navLabel: "Pet Cameras",
    headline: "See them. Talk to them. Wherever you are.",
    description:
      "WiFi cameras for home check-ins and 4G cameras for places WiFi can't reach, all in the same Waggle app as your monitor.",
    seoTitle: "Pet Cameras: WiFi and 4G Cellular",
    seoDescription:
      "Compare Waggle pet cameras: WaggleCam Pro with treat tossing, the compact RV WiFi Mini Cam, and the battery-powered RV 4G Mini Camera that needs no WiFi.",
    guidance: [
      "Have reliable home WiFi? WaggleCam Pro adds treat tossing and 360° tracking.",
      "Need a compact indoor camera? The RV WiFi Mini Cam pans, tilts and follows movement.",
      "No WiFi? The RV 4G Mini Camera streams over its own cellular connection.",
    ],
  },
  {
    slug: "travel-adventure",
    name: "Travel & Adventure",
    navLabel: "Travel & Adventure",
    headline: "Bring peace of mind on every road trip.",
    description:
      "Monitors and cameras with built-in 4G and long battery life for vans, campers, campsites and every stop in between.",
    seoTitle: "Pet Monitoring for Road Trips and Travel",
    seoDescription:
      "Keep pets safe on the road with Waggle's 4G temperature monitors, satellite-backed alerts and battery-powered 4G cameras. No WiFi required.",
    guidance: [
      "Built-in 4G means no hotspot or campground WiFi to configure.",
      "Pro+ Satellite keeps critical alerts going when you drive beyond cell coverage.",
      "The RV 4G Mini Camera runs for months on battery, with an optional solar panel.",
    ],
  },
  {
    slug: "home-property",
    name: "Home & Property",
    navLabel: "Home & Property",
    headline: "Watch over home, the cabin, and everything in between.",
    description:
      "WiFi cameras for the living room, plus cellular, battery and solar options for sheds, cabins and properties without internet.",
    seoTitle: "Home and Property Monitoring Cameras",
    seoDescription:
      "Waggle cameras and monitors for home and property: WiFi pet cameras indoors, and weather-resistant 4G cameras for places without WiFi.",
    guidance: [
      "Indoors with WiFi: WaggleCam Pro or RV WiFi Mini Cam.",
      "Outdoors or no WiFi: the IP65-rated RV 4G Mini Camera or the solar RV 4G Camera.",
      "Add a Pet Monitor for temperature and power-outage alerts at home.",
    ],
  },
  {
    slug: "rv-solutions",
    name: "RV Solutions",
    navLabel: "RV Solutions",
    headline: "Everything your rig needs, from the campsite to the hitch.",
    description:
      "The original Waggle use case: temperature and power monitoring for pets in RVs, plus 4G cameras and a wireless observation system for driving.",
    seoTitle: "RV Pet Monitors, 4G Cameras and Backup Cameras",
    seoDescription:
      "Waggle RV solutions: 4G pet temperature monitors with power-loss and geofence alerts, 4G and WiFi cameras, and a wireless RV observation camera with 7\" display.",
    guidance: [
      "Parked with pets inside: start with a Pet Monitor for temperature and shore-power alerts.",
      "Want to see inside: add the RV 4G Mini Camera (no WiFi) or RV WiFi Mini Cam (with WiFi).",
      "Backing up and towing: the RV Observation System has its own 7\" display, with no app needed.",
    ],
  },
  {
    slug: "no-wifi",
    name: "Monitoring Without WiFi",
    navLabel: "No WiFi? No Problem",
    headline: "No WiFi? Built-in 4G has you covered.",
    description:
      "Every device here connects on its own, with a built-in cellular connection or a dedicated wireless link. Nothing to pair with a router.",
    seoTitle: "Pet Monitors and Cameras That Work Without WiFi",
    seoDescription:
      "Monitor pets and property without WiFi. Waggle devices with built-in 4G send temperature alerts and stream video anywhere with cell coverage.",
    guidance: [
      "Cellular devices need a Waggle plan, which includes the data. You can't use your own phone plan.",
      "Check cell coverage where you'll use it. Pro+ Satellite adds a satellite path for critical alerts.",
      "Waggle cellular devices aren't compatible with cellphone signal boosters.",
    ],
  },
  {
    slug: "bundles",
    name: "Bundles",
    navLabel: "Bundles",
    headline: "Better together, for less.",
    description: "Waggle's published bundles pair a monitor with the right camera. Or build your own.",
    seoTitle: "Waggle Bundles: Monitor + Camera Kits",
    seoDescription: "Pair a Waggle temperature monitor with a WiFi or 4G camera. See published bundle pricing or build your own bundle.",
    guidance: [
      "Each cellular device needs its own plan, shown before checkout.",
      "Published bundle pricing applies only when your selection exactly matches a bundle.",
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
