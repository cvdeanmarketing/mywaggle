import Image from "next/image";
import type { Product } from "@/lib/catalog";
import { cn } from "@/lib/format";
import { ART_PHOTOS, ProductArt } from "./ProductArt";

const TONES: Record<Product["art"], string> = {
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
}: {
  product: Product;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Render bundle contents side by side. */
  bundleStack?: Product[];
}) {
  const img = product.images[0];
  return (
    <div className={cn("relative overflow-hidden", TONES[product.art], className)}>
      {img ? (
        <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className="object-contain p-6" />
      ) : bundleStack && bundleStack.length > 1 ? (
        <div className="absolute inset-0 flex items-end justify-center px-4 pb-2">
          {bundleStack.map((p, i) => (
            <ProductArt
              key={p.handle}
              art={p.art}
              title={ART_PHOTOS[p.art] ? p.name : `Illustration of ${p.name}`}
              className={cn("h-[78%] w-auto shrink", i > 0 && "-ml-[12%]", i === 1 && "z-10 h-[88%]")}
            />
          ))}
        </div>
      ) : (
        <ProductArt art={product.art} title={ART_PHOTOS[product.art] ? product.name : `Illustration of ${product.name}`} className="absolute inset-0 m-auto h-[88%] w-[88%]" />
      )}
    </div>
  );
}
