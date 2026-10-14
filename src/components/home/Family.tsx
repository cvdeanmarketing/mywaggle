import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { devices, priceOf, type ArtKey, type Product } from "@/lib/catalog";
import { money } from "@/lib/format";
import { ProductArt } from "@/components/product/ProductArt";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Family {
  name: string;
  summary: string;
  href: string;
  art: ArtKey[];
  members: (p: Product) => boolean;
  tone: string;
}

const FAMILIES: Family[] = [
  {
    name: "Pet Safety Monitors",
    summary: "Temperature, humidity and power-loss alerts over built-in 4G. Know before it's dangerous.",
    href: "/shop/pet-safety",
    art: ["monitor-pro"],
    members: (p) => p.capabilities.includes("temperature"),
    tone: "bg-[#f3ece4]",
  },
  {
    name: "Home Pet Cameras",
    summary: "See, hear and talk to your pet over home WiFi. Toss a treat while you're at it.",
    href: "/shop/pet-cameras",
    art: ["wagglecam-pro", "wifi-mini-cam"],
    members: (p) => p.capabilities.includes("live-video") && p.connectivity.includes("wifi"),
    tone: "bg-[#e9f1fa]",
  },
  {
    name: "4G Cameras",
    summary: "Live video where WiFi can't reach: RVs, cabins, campsites and property. Battery and solar.",
    href: "/shop/no-wifi",
    art: ["mini-cam-4g", "camera-4g"],
    members: (p) => p.capabilities.includes("live-video") && p.connectivity.includes("cellular"),
    tone: "bg-[#eef0ec]",
  },
  {
    name: "Driving Visibility",
    summary: "A wireless camera and dedicated 7\" display for backing up, hitching and towing.",
    href: "/products/rv-observation-system",
    art: ["observation-system"],
    members: (p) => p.capabilities.includes("driving-visibility"),
    tone: "bg-[#f2eee8]",
  },
];

export function FamilySection() {
  const all = devices();
  return (
    <section className="py-20 sm:py-28" aria-labelledby="family-title">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="family-title"
            eyebrow="The Waggle family"
            title="One app. Four ways to stay connected."
            intro="Every device works on its own and together in the Waggle app. Start with one, then add more as life changes."
          />
          <Link href="/shop" className="inline-flex shrink-0 items-center gap-1.5 font-bold text-ink hover:text-signal">
            Shop all products <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FAMILIES.map((f) => {
            const members = all.filter(f.members);
            const from = Math.min(...members.map(priceOf));
            return (
              <li key={f.name}>
                <Link href={f.href} className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper transition-shadow hover:shadow-[var(--shadow-lift)]">
                  <div className={`relative flex aspect-[5/4] items-end justify-center overflow-hidden ${f.tone}`}>
                    {f.art.map((a, i) => (
                      <ProductArt
                        key={a}
                        art={a}
                        title=""
                        className={`h-[92%] w-auto transition-transform duration-500 ease-out group-hover:-translate-y-1.5 ${i > 0 ? "-ml-[18%] h-[80%]" : ""}`}
                      />
                    ))}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-xl font-semibold">{f.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{f.summary}</p>
                    <p className="mt-4 flex items-center justify-between text-sm">
                      <span>
                        {members.length} {members.length === 1 ? "device" : "devices"} · from <strong>{money(from)}</strong>
                      </span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
