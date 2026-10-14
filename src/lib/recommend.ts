import { CAPABILITY_LABELS, bundles, devices, getPlan, getProduct, priceOf, type Capability, type Product } from "@/lib/catalog";

export type ProtectAnswer = "pets" | "home" | "rv" | "travel" | "multiple";
export type WhereAnswer = "home" | "rv" | "traveling" | "no-wifi" | "multiple";
export type PriorityAnswer = "temperature" | "video" | "audio" | "portable" | "driving" | "multiple";
export type WifiAnswer = "yes" | "no" | "sometimes" | "unsure";

export interface QuizAnswers {
  protect: ProtectAnswer;
  where: WhereAnswer;
  priority: PriorityAnswer;
  wifi: WifiAnswer;
}

export interface Recommendation {
  best: Product;
  reasons: string[];
  alternative?: { product: Product; why: string };
  bundle: { name: string; handles: string[]; published?: Product; why: string };
  connectivity: string;
  subscriptions: string[];
  /** True when WiFi-only devices were excluded because WiFi isn't reliable. */
  wifiExcluded: boolean;
}

export const QUIZ = [
  {
    key: "protect",
    question: "What would you like to protect?",
    options: [
      { value: "pets", label: "My pets" },
      { value: "home", label: "My home or property" },
      { value: "rv", label: "My RV" },
      { value: "travel", label: "My travel setup" },
      { value: "multiple", label: "Multiple things" },
    ],
  },
  {
    key: "where",
    question: "Where will you use your device?",
    options: [
      { value: "home", label: "At home" },
      { value: "rv", label: "In an RV" },
      { value: "traveling", label: "While traveling" },
      { value: "no-wifi", label: "Somewhere without WiFi" },
      { value: "multiple", label: "Multiple locations" },
    ],
  },
  {
    key: "priority",
    question: "What matters most?",
    options: [
      { value: "temperature", label: "Temperature alerts" },
      { value: "video", label: "Live video" },
      { value: "audio", label: "Two-way audio" },
      { value: "portable", label: "Portable monitoring" },
      { value: "driving", label: "Driving visibility" },
      { value: "multiple", label: "Multiple features" },
    ],
  },
  {
    key: "wifi",
    question: "Do you have reliable WiFi where you'll use it?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "sometimes", label: "Sometimes" },
      { value: "unsure", label: "Not sure" },
    ],
  },
] as const;

const PRIORITY_CAPS: Record<Exclude<PriorityAnswer, "multiple">, Capability[]> = {
  temperature: ["temperature"],
  video: ["live-video"],
  audio: ["two-way-audio"],
  portable: ["battery-powered"],
  driving: ["driving-visibility"],
};

/** WiFi is only trusted when the customer says it's reliable and isn't heading somewhere without it. */
export function wifiIsReliable(a: QuizAnswers): boolean {
  return a.wifi === "yes" && a.where !== "no-wifi";
}

function needsWifi(p: Product): boolean {
  return p.connectivity.includes("wifi");
}

function score(p: Product, a: QuizAnswers): number {
  let s = 0;
  const has = (c: Capability) => p.capabilities.includes(c);
  const inCat = (c: Product["categories"][number]) => p.categories.includes(c);

  // What matters most
  if (a.priority === "multiple") {
    s += (["temperature", "live-video", "two-way-audio"] as Capability[]).filter(has).length * 2;
    if (p.kind === "bundle") s += 3;
  } else {
    if (PRIORITY_CAPS[a.priority].some(has)) s += 8;
    if (a.priority === "portable" && p.connectivity.includes("cellular")) s += 2;
  }
  // Driving cameras only make sense when someone asks for driving visibility or protects an RV
  if (has("driving-visibility") && a.priority !== "driving") s -= a.protect === "rv" ? 4 : 10;

  // Where
  if (a.where === "home" && inCat("home-property")) s += 2;
  if (a.where === "rv" && inCat("rv-solutions")) s += 2;
  if (a.where === "traveling" && inCat("travel-adventure")) s += 2;
  if (a.where === "no-wifi" && p.connectivity.includes("cellular")) s += 2;
  if (a.where === "multiple" && inCat("travel-adventure")) s += 1;
  if (a.where === "multiple" && inCat("home-property")) s += 1;

  // What to protect
  if (a.protect === "pets" && (inCat("pet-safety") || inCat("pet-cameras"))) s += 2;
  if (a.protect === "home" && inCat("home-property")) s += 3;
  if (a.protect === "rv" && inCat("rv-solutions")) s += 2;
  if (a.protect === "travel" && inCat("travel-adventure")) s += 2;
  if (a.protect === "multiple" && p.kind === "bundle") s += 2;

  // Connectivity fit: with reliable WiFi, a WiFi device avoids a data plan; without it, cellular is the dependable choice.
  if (wifiIsReliable(a) && p.connectivity.includes("wifi") && a.where === "home") s += 3;
  if (!wifiIsReliable(a) && p.connectivity.includes("cellular")) s += 1;

  // Satellite only earns its place when coverage is genuinely uncertain
  if (has("satellite-alerts")) s += a.where === "no-wifi" || a.where === "traveling" ? 1 : -3;
  // Bundles are offered separately unless the customer asked for several things
  if (p.kind === "bundle" && a.priority !== "multiple" && a.protect !== "multiple") s -= 4;

  return s;
}

function reasonsFor(p: Product, a: QuizAnswers): string[] {
  const out: string[] = [];
  if (a.priority !== "multiple") {
    const caps = PRIORITY_CAPS[a.priority].filter((c) => p.capabilities.includes(c));
    if (caps.length) out.push(`Delivers what matters most to you: ${caps.map((c) => CAPABILITY_LABELS[c].toLowerCase()).join(", ")}.`);
  } else {
    const caps = (["temperature", "live-video", "two-way-audio"] as Capability[]).filter((c) => p.capabilities.includes(c));
    if (caps.length) out.push(`Covers several needs at once: ${caps.map((c) => CAPABILITY_LABELS[c].toLowerCase()).join(", ")}.`);
  }
  if (p.connectivity.includes("cellular") && !wifiIsReliable(a)) out.push("Connects over its own built-in 4G, so it doesn't depend on WiFi.");
  if (p.connectivity.includes("wifi") && wifiIsReliable(a)) out.push("Uses the reliable WiFi you already have, with no cellular data needed.");
  if (p.connectivity.includes("local-wireless")) out.push("Camera and display link directly, with no WiFi, app or plan needed while you drive.");
  if (p.capabilities.includes("satellite-alerts")) out.push("Critical alerts fall back to satellite when cell signal drops.");
  if (p.capabilities.includes("power-loss-alerts") && (a.protect === "home" || a.where === "home"))
    out.push("Power-loss alerts warn you if an outage takes out the AC or heat.");
  if (p.capabilities.includes("gps-geofence") && (a.where === "rv" || a.where === "traveling")) out.push("GPS geofence (RVSentry) alerts you if your vehicle moves.");
  if (p.capabilities.includes("battery-powered")) out.push("Battery-powered, so you can place it where there's no outlet.");
  return out.slice(0, 4);
}

function complementFor(best: Product, pool: Product[]): Product | undefined {
  const monitorFirst = !best.capabilities.includes("temperature");
  return pool.find((p) =>
    p.handle !== best.handle && (monitorFirst ? p.capabilities.includes("temperature") : p.capabilities.includes("live-video") && !p.capabilities.includes("driving-visibility")),
  );
}

export function recommend(a: QuizAnswers): Recommendation {
  const wifiOk = wifiIsReliable(a);
  const eligible = (p: Product) => wifiOk || !needsWifi(p);

  const ranked = [...devices(), ...bundles()]
    .filter(eligible)
    .map((p) => ({ p, s: score(p, a) }))
    .sort((x, y) => y.s - x.s || x.p.merchRank - y.p.merchRank)
    .map((r) => r.p);

  const best = ranked[0]!;
  const alt = ranked.find((p) => p.handle !== best.handle && p.kind === "device" && !(best.includes ?? []).includes(p.handle));

  // Compatible bundle: a published bundle containing (or being) the best fit, else a custom pair.
  const devicePool = ranked.filter((p) => p.kind === "device");
  let bundle: Recommendation["bundle"];
  const published = best.kind === "bundle" ? best : bundles().filter(eligible).find((b) => b.includes?.includes(best.handle));
  if (published && published.handle !== best.handle) {
    bundle = {
      name: published.name,
      handles: published.includes ?? [],
      published,
      why: `Waggle's published ${published.name} includes your best fit at a bundle price.`,
    };
  } else {
    const base = best.kind === "bundle" ? getProduct(best.includes?.[0] ?? "") ?? best : best;
    const add = complementFor(base, devicePool);
    const handles = best.kind === "bundle" ? best.includes ?? [] : [best.handle, ...(add ? [add.handle] : [])];
    bundle = {
      name: best.kind === "bundle" ? best.name : "Your custom pair",
      handles,
      published: best.kind === "bundle" ? best : undefined,
      why:
        best.kind === "bundle"
          ? "Your best fit is already a bundle."
          : add
            ? `Pair it with ${add.name} for ${add.capabilities.includes("temperature") ? "temperature safety" : "live video"} in the same app.`
            : "Works on its own. Add more devices anytime in the bundle builder.",
    };
  }

  const items = (best.kind === "bundle" ? best.includes ?? [] : [best.handle]).map(getProduct).filter((p): p is Product => Boolean(p));
  const subscriptions = items.map((p) => {
    const plan = getPlan(p.planId);
    if (!plan) return `${p.name}: no subscription listed.`;
    const yearly = plan.options.find((o) => o.interval === "year");
    const priceText = yearly ? ` from $${yearly.price}/yr` : " (pricing confirmed at activation)";
    return `${p.name}: ${plan.requirement === "required" ? "requires" : "optional"} ${plan.name}${priceText}.`;
  });

  const connectivity = best.connectivityNote;

  return {
    best,
    reasons: reasonsFor(best, a),
    alternative: alt
      ? {
          product: alt,
          why:
            priceOf(alt) < priceOf(best)
              ? `A lower-cost option at $${priceOf(alt)} that still fits your answers.`
              : `Step up for ${alt.capabilities
                  .filter((c) => !best.capabilities.includes(c))
                  .slice(0, 2)
                  .map((c) => CAPABILITY_LABELS[c].toLowerCase())
                  .join(" and ") || "a different setup"}.`,
        }
      : undefined,
    bundle,
    connectivity,
    subscriptions,
    wifiExcluded: !wifiOk,
  };
}
