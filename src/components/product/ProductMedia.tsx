import Image from "next/image";
import type { Product } from "@/lib/catalog";
import { cn } from "@/lib/format";
import { ART_PHOTOS, ProductArt } from "./ProductArt";

const TONES: Record<Product["art"], string> = {
  tripod: "bg-[#f1f0ee]",
  "vacuum-mount": "bg-[#f1f0ee]",
  "clamp-mount": "bg-[#f1f0ee]",
  "bundle-home-and-roam": "bg-[#f1f0ee]",
  "bundle-pet-scout": "bg-[#f1f0ee]",
  "bundle-rv-4g-scout": "bg-[#f1f0ee]",
  "bundle-rv-4g-scout-pro": "bg-[#f1f0ee]",
  "bundle-roadsafe": "bg-[#f1f0ee]",
  "bundle-rv-watch": "bg-[#f1f0ee]",
  "bundle-anti-anxiety": "bg-[#f1f0ee]",
  "monitor-pro": "bg-[#f3efe9]",
  "monitor-lite": "bg-[#f1f0ee]",
  "monitor-satellite": "bg-[#eef1f5]",
  "wagglecam-pro": "bg-[#f4efe8]",
  "wifi-mini-cam": "bg-[#ecf3fb]",
  "mini-cam-4g": "bg-[#f1f2f4]",
  "camera-4g": "bg-[#eef2ef]",
  travelcam: "bg-[#eef1f4]",
  "observation-system": "bg-[#f3eee6]",
  "solar-panel": "bg-[#eef1f6]",
};

/** Official photography when supplied; otherwise the device rendering on a tonal ground. */
export function ProductMedia({
  product,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
  bundleStack,
  reserveBadge,
}: {
  product: Product;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Render bundle contents side by side. */
  bundleStack?: Product[];
  /** Keep a clear band along the top so a card badge never sits on the photo's own text. */
  reserveBadge?: boolean;
}) {
  const img = product.images[0];
  // Full-bleed marketing tiles are square and carry their own text, so the slot must stay square or they get cropped.
  const fullBleed = !img && ART_PHOTOS[product.art]?.cover;
  const shrink = fullBleed && reserveBadge;
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        TONES[product.art],
        className,
        fullBleed && !shrink && "!aspect-square",
      )}
    >
      {img ? (
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={
            img.fit === "cover" ? "object-cover" : "object-contain p-6"
          }
        />
      ) : bundleStack && bundleStack.length > 1 && !ART_PHOTOS[product.art] ? (
        <div className="absolute inset-0 flex items-end justify-center px-4 pb-2">
          {bundleStack.map((p, i) => (
            <ProductArt
              key={p.handle}
              art={p.art}
              title={ART_PHOTOS[p.art] ? p.name : `Illustration of ${p.name}`}
              className={cn(
                "h-[78%] w-auto shrink",
                i > 0 && "-ml-[12%]",
                i === 1 && "z-10 h-[88%]",
              )}
            />
          ))}
        </div>
      ) : (
        <ProductArt
          art={product.art}
          title={
            ART_PHOTOS[product.art]
              ? product.name
              : `Illustration of ${product.name}`
          }
          className={
            ART_PHOTOS[product.art]?.cover
              ? shrink
                ? "absolute inset-x-3 bottom-2 top-11 m-auto aspect-square h-[calc(100%-3.25rem)] w-auto max-w-full"
                : "absolute inset-0 size-full"
              : "absolute inset-0 m-auto h-[88%] w-[88%]"
          }
        />
      )}
    </div>
  );
}
