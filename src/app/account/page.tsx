import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shop/PageHeader";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Account", path: "/account" }]}
        title="Your Waggle account"
        intro="Sign-in connects to Shopify customer accounts in production. In this prototype, accounts are not enabled."
      />
      <div className="container-page grid gap-6 py-12 md:grid-cols-3">
        {[
          {
            t: "Devices & plans",
            d: "Plans are managed in the Waggle app, where you activate devices and choose billing.",
            href: "/plans",
            cta: "How plans work",
          },
          {
            t: "Orders",
            d: "Order history and tracking come from the commerce provider once connected.",
            href: "/shop",
            cta: "Continue shopping",
          },
          {
            t: "Refer friends & partners",
            d: "Get a referral link, apply as an ambassador, or join Waggle Alpha.",
            href: "/partners",
            cta: "Partner with Waggle",
          },
        ].map((c) => (
          <div
            key={c.t}
            className="rounded-[var(--radius-card)] border border-line p-6"
          >
            <h2 className="text-xl font-semibold">{c.t}</h2>
            <p className="mt-2 text-sm text-muted">{c.d}</p>
            <Link href={c.href} className="link mt-4 inline-block text-sm">
              {c.cta}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
