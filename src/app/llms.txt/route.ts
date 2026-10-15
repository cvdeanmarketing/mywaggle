import {
  categories,
  getPlan,
  perDayLabel,
  planPricing,
  products,
} from "@/lib/catalog";
import { ARTICLES } from "@/lib/content/articles";
import { SITE, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** llms.txt: a plain-text map of the site for AI assistants and answer engines. */
export function GET() {
  const lines: string[] = [
    "# Waggle",
    "",
    `> ${SITE.description}`,
    "",
    "Waggle cellular devices have a built-in 4G connection and work without WiFi. They need a Waggle plan (one per device), which includes the data. WiFi cameras work without a plan.",
    "",
    "## Products",
    ...products
      .filter((p) => p.kind !== "accessory")
      .map((p) => {
        const plan = getPlan(p.planId);
        const { yearly, perDay } = planPricing(plan);
        const planText = !plan
          ? "no plan listed"
          : plan.requirement === "optional"
            ? "optional plan"
            : yearly
              ? `plan required, $${yearly}/yr (${perDayLabel(perDay!)})`
              : "plan required";
        return `- [${p.name}](${absoluteUrl(`/products/${p.handle}`)}): ${p.tagline} $${p.variants[0]?.price.amount}, ${planText}.`;
      }),
    "",
    "## Shop by need",
    ...categories.map(
      (c) =>
        `- [${c.name}](${absoluteUrl(c.slug === "bundles" ? "/bundles" : `/shop/${c.slug}`)}): ${c.description}`,
    ),
    "",
    "## Guides",
    ...ARTICLES.map(
      (a) =>
        `- [${a.title}](${absoluteUrl(`/learn/${a.slug}`)}): ${a.quickAnswer}`,
    ),
    "",
    "## Help",
    `- [Subscription plans](${absoluteUrl("/plans")})`,
    `- [Find Your Waggle quiz](${absoluteUrl("/find-your-waggle")})`,
    `- Support: ${SITE.phone}, ${SITE.email}`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
