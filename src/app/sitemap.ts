import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/catalog";
import { ARTICLES, SECTIONS } from "@/lib/content/articles";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    "/",
    "/shop",
    "/bundles",
    "/compare",
    "/find-your-waggle",
    "/plans",
    "/learn",
    "/live",
    "/partners",
  ];
  return [
    ...staticPaths.map((p) => ({
      url: absoluteUrl(p),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "/" ? 1 : 0.8,
    })),
    ...categories
      .filter((c) => c.slug !== "bundles")
      .map((c) => ({
        url: absoluteUrl(`/shop/${c.slug}`),
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ...products.map((p) => ({
      url: absoluteUrl(`/products/${p.handle}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p.kind === "device" ? 0.9 : 0.7,
    })),
    ...Object.keys(SECTIONS).map((s) => ({
      url: absoluteUrl(`/learn/section/${s}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...ARTICLES.map((a) => ({
      url: absoluteUrl(`/learn/${a.slug}`),
      lastModified: new Date(a.updated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
