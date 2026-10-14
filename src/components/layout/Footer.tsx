import { Headset, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { FOOTER_NAV } from "@/lib/nav";
import { SITE } from "@/lib/site";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { Logo } from "./Logo";

const TRUST = [
  { icon: Truck, label: SITE.policies.shipping },
  { icon: RotateCcw, label: SITE.policies.returns },
  { icon: ShieldCheck, label: SITE.policies.warranty },
  { icon: Headset, label: SITE.policies.support },
];

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="border-b border-line-dark">
        <ul className="container-page grid grid-cols-2 gap-x-4 gap-y-6 py-7 text-[13px] font-bold leading-snug md:grid-cols-4 md:text-sm">
          {TRUST.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex flex-col items-center justify-start gap-2 text-center md:flex-row md:justify-center md:gap-2.5 md:border-l md:border-line-dark md:first:border-l-0"
            >
              <Icon className="size-5 shrink-0 text-clay" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      </div>
      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <Logo tone="light" className="h-8 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-dark">
            Connected pet safety for home, travel and the open road. Built for
            pets, trusted by pet parents.
          </p>
          <div className="mt-6 max-w-sm">
            <p className="text-sm font-bold">
              Pet safety tips and product news
            </p>
            <NewsletterForm tone="dark" source="footer" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 xl:grid-cols-[repeat(4,minmax(0,1fr))_minmax(11rem,1.2fr)]">
          {FOOTER_NAV.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-sm font-bold">{col.title}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-dark">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <p className="text-sm font-bold">Support</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-dark">
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/-/g, "")}`}
                  className="hover:text-paper"
                >
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="whitespace-nowrap hover:text-paper"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <Link href="/live" className="hover:text-paper">
                  Waggle Live
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-paper">
                  Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-line-dark">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-dark sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Waggle. All rights reserved.</p>
          <p>Prototype storefront: demo checkout, no charges are made.</p>
        </div>
      </div>
    </footer>
  );
}
