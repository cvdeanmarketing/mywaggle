import type { Metadata } from "next";
import { ArrowRight, Check, Headset, Radio, RotateCcw, Satellite, ShieldCheck, Star, Truck, Wifi, Link2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bundles, getProduct, products, relatedProducts, type Product } from "@/lib/catalog";
import { PLANS_FAQS } from "@/lib/content/faqs";
import { productLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/format";
import { ConnectivityTags } from "@/components/product/ConnectivityTag";
import { PlanCard } from "@/components/product/PlanCard";
import { Price } from "@/components/product/Price";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductMedia } from "@/components/product/ProductMedia";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/ui/Faq";

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const p = getProduct(handle);
  if (!p) return {};
  return {
    title: `${p.name}: ${p.tagline.replace(/\.$/, "")}`,
    description: `${p.headline} ${p.connectivityNote}`.slice(0, 158),
    alternates: { canonical: `/products/${p.handle}` },
    openGraph: { title: p.name, description: p.tagline, url: `/products/${p.handle}` },
  };
}

const CONNECTIVITY_EXPLAINER = [
  { key: "cellular", icon: Radio, title: "Built-in 4G", body: "Has its own cellular connection, like a phone. Works anywhere there's cell coverage, with no router, hotspot or WiFi password. Needs a Waggle plan, which includes the data." },
  { key: "wifi", icon: Wifi, title: "WiFi", body: "Connects through your router. Great at home with reliable internet. Goes offline if the WiFi or power drops." },
  { key: "satellite", icon: Satellite, title: "Satellite backup", body: "When cell signal drops, critical alerts switch to a satellite path, so emergencies still reach you." },
  { key: "local-wireless", icon: Link2, title: "Direct wireless", body: "The camera talks straight to its own display. No internet, app or plan involved." },
] as const;

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const p = getProduct(handle);
  if (!p) notFound();

  const included = (p.includes ?? []).map(getProduct).filter((x): x is Product => Boolean(x));
  const related = relatedProducts(p);
  const inBundles = bundles().filter((b) => b.includes?.includes(p.handle));
  const category = p.categories[0];
  const crumbCat =
    category === "bundles" ? { name: "Bundles", path: "/bundles" } : { name: category ? category.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()) : "Shop", path: `/shop/${category}` };
  const faqs = [...p.faqs, ...(p.planId ? PLANS_FAQS.slice(0, 2) : [])];
  const conflicts = [...p.variants.filter((v) => v.price.status !== "verified").map((v) => `Price: ${v.price.note ?? ""}`), ...p.specs.filter((s) => s.status !== "verified").map((s) => `${s.label}: ${s.note ?? s.value}`)];

  return (
    <>
      <div className="container-page pt-6">
        <Breadcrumbs items={[{ name: "Shop All", path: "/shop" }, crumbCat, { name: p.name, path: `/products/${p.handle}` }]} />
      </div>

      <section className="container-page grid gap-8 pb-16 pt-6 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <ProductMedia product={p} bundleStack={included.length ? included : undefined} priority className="aspect-square rounded-[28px]" sizes="(min-width: 1024px) 55vw, 100vw" />
          {included.length > 0 && (
            <ul className="mt-3 grid grid-cols-3 gap-3">
              {included.map((d) => (
                <li key={d.handle}>
                  <Link href={`/products/${d.handle}`} className="block rounded-2xl border border-line p-2 text-center text-xs font-bold hover:border-ink">
                    <ProductMedia product={d} className="mb-2 aspect-square rounded-xl" sizes="15vw" />
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          {p.badge && <p className="eyebrow">{p.badge}</p>}
          <h1 className="mt-2 text-4xl font-semibold leading-[1.05] sm:text-5xl">{p.name}</h1>
          <p className="mt-3 text-lg leading-relaxed text-muted">{p.headline}</p>
          {p.reviews && (
            <a href="#reviews" className="mt-3 inline-flex items-center gap-2 text-sm">
              <span className="flex" aria-hidden>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={cn("size-4", i <= Math.round(p.reviews!.rating) ? "fill-[#e8a33d] text-[#e8a33d]" : "text-line")} />
                ))}
              </span>
              <span className="font-bold">{p.reviews.rating.toFixed(1)}</span>
              <span className="text-muted">({p.reviews.count} reviews)</span>
            </a>
          )}
          <Price product={p} size="lg" className="mt-5" />
          <div className="mt-4">
            <ConnectivityTags connectivity={p.connectivity} />
          </div>

          {p.features.length > 0 && (
            <ul className="mt-6 space-y-2.5">
              {p.features.slice(0, 4).map((f) => (
                <li key={f.title} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-mint" aria-hidden />
                  <span>
                    <strong>{f.title}.</strong> <span className="text-muted">{f.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}

          {included.length > 0 && (
            <div className="mt-6 rounded-2xl bg-sand p-5">
              <p className="font-bold">What&apos;s included</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {included.map((d) => (
                  <li key={d.handle} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-mint" aria-hidden />
                    <span>
                      <strong>{d.name}:</strong> <span className="text-muted">{d.tagline}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            {included.length > 0 ? (
              <div className="space-y-3">
                {included
                  .filter((d) => d.planId)
                  .map((d) => (
                    <div key={d.handle}>
                      <p className="mb-1.5 text-xs font-bold text-muted">For {d.name}</p>
                      <PlanCard product={d} />
                    </div>
                  ))}
              </div>
            ) : (
              <PlanCard product={p} />
            )}
          </div>

          <div className="mt-6">
            <PurchasePanel product={p} />
          </div>

          <ul className="mt-5 grid grid-cols-2 gap-2 text-xs font-bold">
            {[
              [Truck, SITE.policies.shipping],
              [RotateCcw, SITE.policies.returns],
              [ShieldCheck, SITE.policies.warranty],
              [Headset, SITE.policies.support],
            ].map(([Icon, label]) => {
              const I = Icon as typeof Truck;
              return (
                <li key={label as string} className="flex items-center gap-2 rounded-xl bg-sand px-3 py-2.5">
                  <I className="size-4 text-clay-700" aria-hidden />
                  {label as string}
                </li>
              );
            })}
          </ul>

          <Link href="/find-your-waggle" className="mt-5 flex items-center justify-between rounded-2xl bg-ink px-5 py-4 text-paper">
            <span className="text-sm font-bold">Not sure this is the right Waggle?</span>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-clay">
              Find Your Waggle <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>
        </div>
      </section>

      {/* Connectivity explained */}
      <section className="bg-sand py-16 sm:py-20" aria-labelledby="conn-title">
        <div className="container-page">
          <p className="eyebrow">How it connects</p>
          <h2 id="conn-title" className="mt-3 max-w-2xl text-3xl font-semibold sm:text-4xl">{p.connectivityNote}</h2>
          <ul className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {CONNECTIVITY_EXPLAINER.map(({ key, icon: Icon, title, body }) => {
              const on = p.connectivity.includes(key);
              return (
                <li key={key} className={cn("rounded-2xl p-5", on ? "bg-ink text-paper" : "bg-paper text-ink/60")}>
                  <div className="flex items-center justify-between">
                    <Icon className={cn("size-6", on ? "text-clay" : "")} aria-hidden />
                    {on && <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-bold">This device</span>}
                  </div>
                  <p className="mt-4 font-display text-lg font-semibold">{title}</p>
                  <p className={cn("mt-1 text-sm leading-relaxed", on ? "text-muted-dark" : "")}>{body}</p>
                </li>
              );
            })}
          </ul>
          <Link href="/learn/cellular-vs-wifi" className="link mt-6 inline-block text-sm">Cellular vs. WiFi, explained</Link>
        </div>
      </section>

      {/* Details */}
      {(p.features.length > 0 || p.specs.length > 0) && (
        <section className="py-16 sm:py-20" aria-labelledby="details-title">
          <div className="container-page grid gap-12 lg:grid-cols-2">
            <div>
              <h2 id="details-title" className="text-3xl font-semibold">Built for</h2>
              <ul className="mt-6 space-y-3">
                {p.useCases.map((u) => (
                  <li key={u} className="flex gap-3 border-b border-line pb-3">
                    <Check className="mt-1 size-4 shrink-0 text-mint" aria-hidden />
                    {u}
                  </li>
                ))}
              </ul>
              <h3 className="mt-10 text-xl font-semibold">Compatibility</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {p.compatibility.map((c) => (
                  <li key={c}>• {c}</li>
                ))}
              </ul>
            </div>
            {p.specs.length > 0 && (
              <div>
                <h2 className="text-3xl font-semibold">Specifications</h2>
                <dl className="mt-6 divide-y divide-line border-y border-line">
                  {p.specs.map((s) => (
                    <div key={s.label} className="grid grid-cols-[140px_1fr] gap-4 py-3.5 text-sm">
                      <dt className="text-muted">{s.label}</dt>
                      <dd className="font-bold">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Reviews */}
      {p.reviews && (
        <section id="reviews" className="border-t border-line py-16" aria-labelledby="rev-title">
          <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="rev-title" className="text-3xl font-semibold">Customer reviews</h2>
              <p className="mt-2 text-muted">
                {p.reviews.rating.toFixed(1)} out of 5 from {p.reviews.count} {p.reviews.source.toLowerCase()}.
              </p>
            </div>
            <a href={p.reviews.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Read all reviews <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="bg-sand py-16 sm:py-20" aria-labelledby="pfaq-title">
          <div className="container-page grid gap-10 lg:grid-cols-[0.7fr_1.6fr]">
            <h2 id="pfaq-title" className="text-3xl font-semibold">Questions about {p.name}</h2>
            <Faq items={faqs} withSchema />
          </div>
        </section>
      )}

      {/* Cross-sell */}
      {(related.length > 0 || inBundles.length > 0) && (
        <section className="py-16 sm:py-20" aria-labelledby="rel-title">
          <div className="container-page">
            <h2 id="rel-title" className="text-3xl font-semibold">Works well with</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[...inBundles, ...related].slice(0, 4).map((r, i) => (
                <li key={r.handle}>
                  <ProductCard product={r} listName={`pdp_related_${p.handle}`} index={i} className="h-full" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Prototype data audit, collapsed by default */}
      <section className="container-page pb-16">
        <details className="rounded-2xl border border-dashed border-line p-5 text-sm">
          <summary className="font-bold text-muted">Prototype: data sources & verification for this product</summary>
          <div className="mt-4 space-y-3 text-muted">
            {conflicts.length > 0 ? (
              <ul className="list-disc space-y-1 pl-5">
                {conflicts.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            ) : (
              <p>All displayed figures match Waggle&apos;s published pages.</p>
            )}
            <p>
              Sources:{" "}
              {p.sources.map((s, i) => (
                <span key={s.url}>
                  {i > 0 && " · "}
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline">{s.label}</a>
                </span>
              ))}
            </p>
          </div>
        </details>
      </section>

      <JsonLd data={productLd(p)} />
    </>
  );
}
