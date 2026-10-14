import { compareAtOf, priceOf, type Product } from "@/lib/catalog";
import { SITE, absoluteUrl } from "@/lib/site";

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl("/icon.svg"),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+1-${SITE.phone}`,
        email: SITE.email,
        contactType: "customer support",
        areaServed: "US",
      },
    ],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

/**
 * Product structured data. No aggregateRating/review is emitted because no
 * verified review feed is connected; add it only from a real review provider.
 */
export function productLd(p: Product) {
  const price = priceOf(p);
  const img = p.images[0]?.src;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    brand: { "@type": "Brand", name: "Waggle" },
    sku: p.variants[0]?.id,
    url: absoluteUrl(`/products/${p.handle}`),
    ...(img ? { image: [img] } : {}),
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/products/${p.handle}`),
      priceCurrency: "USD",
      price: price.toFixed(2),
      availability: p.variants[0]?.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      ...(compareAtOf(p) ? {} : {}),
    },
  };
}
