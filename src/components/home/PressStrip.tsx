import { cn } from "@/lib/format";

const PRESS_LOGOS = [
  { name: "Dogster", src: "/images/press/dogster.webp", w: 622, h: 176, cls: "h-6 sm:h-7" },
  { name: "Dog Gear Review", src: "/images/press/dog-gear-review.webp", w: 504, h: 152, cls: "h-8 sm:h-9" },
  { name: "The Wayward Home", src: "/images/press/wayward-home.webp", w: 256, h: 43, cls: "h-6 sm:h-8 !opacity-90 contrast-150" },
  { name: "The Dyrt", src: "/images/press/the-dyrt.webp", w: 664, h: 196, cls: "h-6 sm:h-8" },
  { name: "Harvest Hosts", src: "/images/press/harvest-hosts.webp", w: 320, h: 200, cls: "h-10 sm:h-11" },
];

export function PressStrip() {
  return (
    <section className="border-b border-line bg-paper" aria-label="Featured by and partnered with">
      <div className="container-page flex flex-col items-center gap-4 py-6 lg:flex-row lg:justify-between lg:gap-10">
        <p className="shrink-0 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Featured by &amp; partnered with</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10">
          {PRESS_LOGOS.map((l) => (
            <li key={l.name} className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={l.src}
                alt={l.name}
                width={l.w}
                height={l.h}
                loading="lazy"
                className={cn("w-auto opacity-50 grayscale transition duration-300 hover:opacity-90 hover:grayscale-0", l.cls)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
