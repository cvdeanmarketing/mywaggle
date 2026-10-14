/**
 * Wag Reads guides.
 *
 * Written answer-first for search and AI assistants: each guide opens with a
 * short quick answer, uses question-style headings, and ends with FAQs that
 * are emitted as FAQPage structured data. Product mentions only use
 * capabilities recorded in the catalog.
 */

export type ArticleSection =
  | "rving-with-pets"
  | "heatstroke"
  | "pet-guides"
  | "buying-guides";

export interface ArticleBlock {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  section: ArticleSection;
  quickAnswer: string;
  updated: string;
  readMinutes: number;
  blocks: ArticleBlock[];
  takeaways: string[];
  faqs: { q: string; a: string }[];
  products: string[];
  tone: "clay" | "signal" | "mint" | "ink";
}

export const SECTIONS: Record<ArticleSection, { name: string; blurb: string }> =
  {
    "rving-with-pets": {
      name: "RVing with Pets",
      blurb: "Checklists and know-how for life on the road with pets.",
    },
    heatstroke: {
      name: "Heatstroke in Pets",
      blurb: "Recognize, prevent and respond to heat danger.",
    },
    "pet-guides": {
      name: "Pet Guides",
      blurb: "Everyday care for pets at home and away.",
    },
    "buying-guides": {
      name: "Buying Guides",
      blurb: "Help choosing the right setup.",
    },
  };

export const ARTICLES: Article[] = [
  {
    slug: "cellular-vs-wifi",
    title: "Cellular vs. WiFi Pet Monitors: Which Do You Need?",
    description:
      "How cellular (4G) and WiFi pet monitors and cameras differ, what each costs to run, and how to choose based on where your pet stays.",
    section: "buying-guides",
    quickAnswer:
      "Choose WiFi if your pet stays somewhere with reliable internet, like a house with good WiFi. Choose a cellular (4G) device if your pet stays in a vehicle, RV, cabin or anywhere WiFi drops out, because a cellular device keeps sending alerts on its own connection. Cellular devices need a data plan. WiFi devices usually don't.",
    updated: "2026-10-14",
    readMinutes: 5,
    tone: "signal",
    blocks: [
      {
        heading: "What's the actual difference?",
        paragraphs: [
          "A WiFi device sends data through your router. If the router, the internet service or the power goes down, the device goes quiet, often exactly when something has gone wrong.",
          "A cellular device has its own built-in SIM and talks directly to cell towers, the same way your phone does. It doesn't need a router, a hotspot or campground WiFi.",
        ],
      },
      {
        heading: "When is WiFi the right choice?",
        bullets: [
          "Your pet stays at home and your WiFi is dependable.",
          "You mainly want video check-ins, two-way talk or treat tossing.",
          "You'd rather not pay for a monthly data plan.",
        ],
      },
      {
        heading: "When do you need cellular?",
        bullets: [
          "Your pet stays in an RV, van, camper or vehicle.",
          "You're somewhere with no WiFi: a cabin, a campsite, a property or a job site.",
          "You need alerts to keep working during a power outage (pair cellular with a backup battery).",
          "You want temperature safety alerts that don't depend on someone else's network.",
        ],
      },
      {
        heading: "What about cost?",
        paragraphs: [
          "Cellular devices include data, so they need a plan. Waggle's 4G plans are billed per device, and the current prices are shown on every product page before you buy. Your existing phone plan can't be used. WiFi cameras use your home internet, and their cloud plans are optional.",
        ],
      },
      {
        heading: "Can I use both?",
        paragraphs: [
          "Yes, and many people do. A common setup is a cellular temperature monitor for safety alerts plus a WiFi camera for check-ins at home. Every Waggle device runs in the same app.",
        ],
      },
    ],
    takeaways: [
      "WiFi is great for check-ins at home with reliable internet.",
      "Cellular keeps working where WiFi doesn't, including vehicles, RVs and outages.",
      "Cellular devices need a data plan, and WiFi cameras usually don't.",
    ],
    faqs: [
      {
        q: "Do cellular pet monitors work without WiFi?",
        a: "Yes. A cellular monitor uses its own built-in SIM and connects to cell towers directly, so it works anywhere there's cell coverage without WiFi.",
      },
      {
        q: "Will a WiFi pet camera work in an RV?",
        a: "Only if the RV has a reliable WiFi connection, such as a dedicated router or dependable campground WiFi. Without one, choose a cellular camera.",
      },
      {
        q: "Can I use my phone plan for a cellular pet monitor?",
        a: "Not for Waggle devices. They use Waggle's built-in cellular service, and the plan is shown before purchase.",
      },
    ],
    products: ["pet-monitor-lite-plus", "rv-4g-mini-camera", "wagglecam-pro"],
  },
  {
    slug: "pet-heat-safety",
    title: "Heatstroke in Pets: Warning Signs, Prevention and What to Do",
    description:
      "How to recognize heatstroke in dogs and cats, how to keep pets safe in hot homes, cars and RVs, and when to call a vet.",
    section: "heatstroke",
    quickAnswer:
      "Heatstroke is an emergency. Signs include heavy panting, drooling, bright red gums, weakness, vomiting and collapse. Move your pet somewhere cool, offer small amounts of water, cool them with lukewarm (not ice-cold) water, and call your vet right away. The best prevention is never leaving a pet anywhere the temperature can climb without someone knowing.",
    updated: "2026-10-14",
    readMinutes: 6,
    tone: "clay",
    blocks: [
      {
        heading: "Why do pets overheat so quickly?",
        paragraphs: [
          "Dogs and cats cool themselves mostly by panting and through their paw pads, which is far less efficient than sweating. Short-nosed breeds, senior pets, puppies, overweight pets and pets with heart or breathing conditions are at higher risk.",
        ],
      },
      {
        heading: "What are the warning signs?",
        bullets: [
          "Heavy, fast panting that doesn't settle",
          "Thick drool, or gums that look bright red or pale",
          "Restlessness, then weakness or stumbling",
          "Vomiting or diarrhea",
          "Collapse or seizures",
        ],
      },
      {
        heading: "What should I do right now?",
        bullets: [
          "Move your pet to shade or air conditioning.",
          "Wet their body with cool or lukewarm water and use a fan. Avoid ice-cold water.",
          "Offer small sips of water. Don't force it.",
          "Call your vet or an emergency clinic immediately, even if your pet seems to recover.",
        ],
      },
      {
        heading: "Where does heat danger happen?",
        paragraphs: [
          "Parked vehicles heat up fast, even on mild days with the windows cracked. RVs can overheat when the AC or shore power fails. Homes can become dangerous during a heat wave or an outage. The common thread is that nobody notices until it's too late.",
        ],
      },
      {
        heading: "How do temperature monitors help?",
        paragraphs: [
          "A temperature monitor watches the space your pet is in and alerts you when it crosses a limit you set. A cellular monitor with a backup battery keeps reporting when the power goes out, which is often what caused the temperature to rise in the first place.",
        ],
      },
    ],
    takeaways: [
      "Heatstroke is an emergency. Cool your pet and call a vet.",
      "Vehicles, RVs and homes without power can all overheat quickly.",
      "Monitoring tells you about rising heat before your pet is in danger.",
    ],
    faqs: [
      {
        q: "What are the first signs of heatstroke in dogs?",
        a: "Heavy panting that doesn't settle, thick drool, bright red gums and restlessness are early signs. Weakness, vomiting and collapse mean it's an emergency.",
      },
      {
        q: "Should I use ice water to cool an overheated pet?",
        a: "No. Use cool or lukewarm water and airflow. Ice-cold water can constrict blood vessels and slow cooling. Call your vet right away.",
      },
      {
        q: "Can cats get heatstroke?",
        a: "Yes. Cats are less likely to pant, so open-mouth breathing in a cat is a warning sign that needs urgent attention.",
      },
    ],
    products: ["pet-monitor-pro-plus", "pet-monitor-lite-plus"],
  },
  {
    slug: "rving-with-pets",
    title: "RVing with Pets: The Complete Safety Checklist",
    description:
      "A practical checklist for traveling and camping in an RV with dogs and cats, from temperature and power to campground rules.",
    section: "rving-with-pets",
    quickAnswer:
      "Before leaving pets in an RV, make sure the AC has a reliable power source, set up a temperature monitor that alerts you by text and app, keep water available, and know the campground's pet rules. On travel days, secure pets the way you would in a car and plan stops every few hours.",
    updated: "2026-10-14",
    readMinutes: 6,
    tone: "mint",
    blocks: [
      {
        heading: "Before you leave pets in the RV",
        bullets: [
          "Confirm shore power or the generator is stable, and know what happens to the AC if it trips.",
          "Set temperature and humidity limits on a monitor that alerts you by app, text and email.",
          "Turn on power-loss alerts so you know the moment shore power drops.",
          "Leave fresh water in a spill-resistant bowl.",
          "Close blinds on the sunny side and leave a radio or white noise on for anxious pets.",
        ],
      },
      {
        heading: "On travel days",
        bullets: [
          "Secure pets in a crate or with a crash-tested harness, never loose in the cab.",
          "Plan breaks every few hours for water and a walk.",
          "Carry vaccination records. Some campgrounds and border crossings ask for them.",
          "Use a backup camera or observation system for safer hitching and parking.",
        ],
      },
      {
        heading: "At the campground",
        bullets: [
          "Check leash rules, breed restrictions and how long pets may be left alone.",
          "Keep a recent photo and your contact details on your pet's tag.",
          "Know the nearest emergency vet before you need one.",
        ],
      },
      {
        heading: "What about places without WiFi?",
        paragraphs: [
          "Campground WiFi is unreliable for safety alerts. A monitor or camera with built-in 4G connects on its own. If you travel beyond cell coverage, a monitor with satellite backup can still deliver critical alerts.",
        ],
      },
    ],
    takeaways: [
      "Power failure is the biggest risk for pets left in an RV.",
      "Use alerts that don't depend on campground WiFi.",
      "Secure pets on travel days and know the campground's rules.",
    ],
    faqs: [
      {
        q: "Is it safe to leave a dog in an RV?",
        a: "It can be, with reliable climate control, power-loss and temperature alerts, water, and a plan to get back quickly if something changes. Never leave pets without a way to know if the AC fails.",
      },
      {
        q: "How do I monitor my RV temperature remotely?",
        a: "Use a temperature monitor with its own cellular connection that sends app, text and email alerts when conditions cross your limits.",
      },
    ],
    products: [
      "pet-monitor-pro-plus",
      "rv-4g-mini-camera",
      "rv-observation-system",
    ],
  },
  {
    slug: "monitor-pets-without-wifi",
    title: "How to Monitor Your Pet Without WiFi",
    description:
      "Options for watching over pets in places with no internet: cars, RVs, cabins, barns and job sites.",
    section: "buying-guides",
    quickAnswer:
      "Use a device with a built-in cellular connection. A 4G temperature monitor sends alerts anywhere there's cell coverage, and a 4G camera streams live video without a router. Both need a data plan. For travel beyond cell coverage, choose a monitor with satellite backup for critical alerts.",
    updated: "2026-10-14",
    readMinutes: 4,
    tone: "ink",
    blocks: [
      {
        heading: "Why not just use a mobile hotspot?",
        paragraphs: [
          "Hotspots need to stay powered, stay on, and stay paired. If any of those fail, your camera goes offline silently. A device with its own cellular connection removes those failure points.",
        ],
      },
      {
        heading: "What can you monitor without WiFi?",
        bullets: [
          "Temperature and humidity, with alerts by app, text and email",
          "Power loss, so you know if AC or heat has stopped",
          "Live video and two-way audio with a 4G camera",
          "Vehicle movement with a GPS geofence",
        ],
      },
      {
        heading: "Check coverage first",
        paragraphs: [
          "Cellular devices need cell signal where they're placed. Check coverage at your destination, and note that Waggle cellular devices aren't compatible with signal boosters.",
        ],
      },
    ],
    takeaways: [
      "Built-in cellular beats a hotspot for reliability.",
      "Cellular devices need a plan and cell coverage.",
      "Satellite backup covers critical alerts beyond coverage.",
    ],
    faqs: [
      {
        q: "Can a pet camera work without internet?",
        a: "A cellular (4G) pet camera can, because it has its own data connection. A WiFi camera cannot stream remotely without internet.",
      },
      {
        q: "Do I need a hotspot for a 4G pet monitor?",
        a: "No. A 4G monitor has a built-in SIM and connects directly to cell towers.",
      },
    ],
    products: [
      "rv-4g-mini-camera",
      "pet-monitor-lite-plus",
      "pet-monitor-pro-plus-satellite",
    ],
  },
  {
    slug: "why-pet-monitors-need-a-subscription",
    title: "Why Do Cellular Pet Monitors Need a Subscription?",
    description:
      "What a pet monitor subscription pays for, which Waggle devices need one, and how to compare plan costs.",
    section: "buying-guides",
    quickAnswer:
      "A cellular monitor's subscription pays for the data connection that lets it send alerts and video without WiFi, the same way a phone plan does. Waggle's 4G devices need one plan per device. WiFi cameras work without a plan, and cloud features are optional.",
    updated: "2026-10-14",
    readMinutes: 4,
    tone: "signal",
    blocks: [
      {
        heading: "What does the plan cover?",
        bullets: [
          "Built-in cellular data for the device",
          "App, text and email alerts",
          "Waggle Vet, Waggle Vault and Waggle Places, which Waggle includes with its subscriptions",
        ],
      },
      {
        heading: "Which devices need one?",
        paragraphs: [
          "Pet Monitor Lite+ and Pro+ need a 4G Network Plan. Pro+ Satellite has its own satellite plan. The RV 4G Mini Camera needs a camera plan for live view and alerts, and still records to its SD card without one. WaggleCam Pro and the RV WiFi Mini Cam work without a plan.",
        ],
      },
      {
        heading: "How to compare cost",
        paragraphs: [
          "Look at the first-year cost: the device price plus a year of the plan. Yearly billing usually costs less than paying monthly. Every Waggle product page shows plan pricing before you add it to your cart.",
        ],
      },
    ],
    takeaways: [
      "The plan is the device's data connection.",
      "One plan per cellular device.",
      "Compare first-year cost, not just device price.",
    ],
    faqs: [
      {
        q: "Can I cancel a Waggle subscription?",
        a: "Waggle's FAQ says you can cancel anytime, with service continuing to the end of the billing cycle.",
      },
      {
        q: "Do WiFi pet cameras need a subscription?",
        a: "Waggle's WiFi cameras stream and record locally without a plan. A cloud plan is optional.",
      },
    ],
    products: ["pet-monitor-lite-plus", "rv-4g-mini-camera"],
  },
  {
    slug: "pets-home-alone-power-outage",
    title: "Pets Home Alone During a Power Outage: How to Prepare",
    description:
      "How a power outage puts pets at risk in hot or cold weather, and how to get alerted when it happens.",
    section: "pet-guides",
    quickAnswer:
      "When the power goes out, AC and heat stop, and WiFi usually goes down with them, so WiFi devices can't warn you. A monitor with power-loss alerts, a cellular connection and a backup battery will tell you the moment the power drops and keep reporting the temperature.",
    updated: "2026-10-14",
    readMinutes: 4,
    tone: "clay",
    blocks: [
      {
        heading: "Why outages are dangerous for pets",
        paragraphs: [
          "In summer, indoor temperatures climb once the AC stops. In winter, homes cool. Pets can't open a window or move somewhere safer, and you may not know anything is wrong until you get home.",
        ],
      },
      {
        heading: "Your outage plan",
        bullets: [
          "Set up power-loss and temperature alerts that don't rely on home WiFi.",
          "Ask a neighbor to be your backup with a key.",
          "Keep the coolest or warmest room accessible to pets.",
          "Know how long your monitor's backup battery lasts.",
        ],
      },
    ],
    takeaways: [
      "Outages usually take WiFi down too.",
      "Cellular plus battery backup keeps alerts coming.",
      "Have a neighbor on standby.",
    ],
    faqs: [
      {
        q: "Will a WiFi camera alert me during a power outage?",
        a: "Usually not. When power drops, the router goes down with it. Use a cellular monitor with a backup battery for outage alerts.",
      },
    ],
    products: ["pet-monitor-lite-plus", "pet-monitor-pro-plus"],
  },
  {
    slug: "choosing-a-pet-camera",
    title: "How to Choose a Pet Camera: WiFi, 4G, Treat-Tossing and More",
    description:
      "Compare indoor WiFi pet cameras with portable 4G cameras and find the right features for your pet.",
    section: "buying-guides",
    quickAnswer:
      "If your pet is at home with good WiFi, a WiFi camera with two-way audio is the simplest choice, and treat tossing adds interaction. If you need video in an RV, cabin or outdoors without WiFi, choose a battery-powered 4G camera. For full-room coverage, look for pan, tilt and auto-tracking.",
    updated: "2026-10-14",
    readMinutes: 5,
    tone: "mint",
    blocks: [
      {
        heading: "Features that matter",
        bullets: [
          "Connectivity: WiFi for home, built-in 4G for anywhere else",
          "Pan, tilt and tracking: follows your pet around the room",
          "Two-way audio: talk to your pet",
          "Night vision: see them after dark",
          "Local recording: SD storage without a cloud fee",
          "Power: plug-in for indoors, battery or solar for remote spots",
        ],
      },
      {
        heading: "Indoor home camera",
        paragraphs: [
          "WaggleCam Pro adds 360° tracking and treat tossing on your home WiFi. The RV WiFi Mini Cam is a compact pan-and-tilt option for any room with WiFi.",
        ],
      },
      {
        heading: "Anywhere without WiFi",
        paragraphs: [
          "The RV 4G Mini Camera streams over built-in 4G, runs on a long-life battery with an optional solar panel, and is IP65 rated.",
        ],
      },
    ],
    takeaways: [
      "Match connectivity to where the camera lives.",
      "Tracking and two-way audio make check-ins useful.",
      "Battery and solar options free you from outlets.",
    ],
    faqs: [
      {
        q: "Do treat-tossing cameras work for cats?",
        a: "Many cats enjoy them. Check the treat size limits for the camera before you buy.",
      },
    ],
    products: ["wagglecam-pro", "rv-wifi-mini-cam", "rv-4g-mini-camera"],
  },
  {
    slug: "road-trips-with-dogs",
    title: "Road Trips with Dogs: Planning, Packing and Stops",
    description:
      "How to plan a comfortable, safe road trip with your dog, including what to pack and how often to stop.",
    section: "rving-with-pets",
    quickAnswer:
      "Secure your dog in a crate or crash-tested harness, stop every few hours for water and a walk, pack food, meds and records, and never leave your dog in a parked car unless you can monitor the temperature and get back fast.",
    updated: "2026-10-14",
    readMinutes: 4,
    tone: "ink",
    blocks: [
      {
        heading: "Packing list",
        bullets: [
          "Food, treats and collapsible bowls",
          "Medications and vaccination records",
          "Leash, harness and waste bags",
          "Bed or blanket that smells like home",
          "A recent photo in case your dog gets lost",
        ],
      },
      {
        heading: "On the road",
        bullets: [
          "Plan pet-friendly stops in advance.",
          "Keep the car's cabin cool, and never leave your dog unattended without monitoring.",
          "Watch for signs of motion sickness or stress.",
        ],
      },
    ],
    takeaways: [
      "Secure pets like passengers.",
      "Stop often.",
      "Monitor the temperature any time your dog stays in the vehicle.",
    ],
    faqs: [
      {
        q: "How often should I stop with a dog on a road trip?",
        a: "Many owners stop every two to four hours for water, a short walk and a bathroom break. Adjust for your dog's age and health.",
      },
    ],
    products: ["pet-monitor-pro-plus", "rv-4g-mini-camera"],
  },
];



/** Existing posts on the current Wag Reads blog (URLs verified). */
export const LEGACY_POSTS = [
  {
    title: "Waggle Pet Temperature Monitor vs. MarCELL Pet Monitor",
    url: "https://mywaggle.com/blogs/pet-protection/waggle-pet-temperature-monitor-vs-marcell-pet-monitor",
  },
  {
    title: "Best Pet Camera: Waggle Buyer's Guide for Smart Pet Parents",
    url: "https://mywaggle.com/blogs/wagglecam/waggle-pet-camera-buyers-guide",
  },
  {
    title: "Treat-Tossing Camera: WaggleCam Pro vs. Petcube Bites 2 Lite",
    url: "https://mywaggle.com/blogs/wagglecam/treat-tossing-camera-wagglecam-pro-vs-petcube-bites-2-lite",
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
