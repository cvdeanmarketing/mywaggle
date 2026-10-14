import type { Metadata } from "next";
import { Headphones, Mail, Phone } from "lucide-react";
import { PageHeader } from "@/components/shop/PageHeader";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description: "Reach Waggle support by chat, phone or email.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  const items = [
    { icon: Headphones, title: "Chat", body: `${SITE.policies.support}. Use the chat button at the bottom right of any page.` },
    { icon: Phone, title: "Phone", body: SITE.phone, href: `tel:${SITE.phone.replace(/-/g, "")}` },
    { icon: Mail, title: "Email", body: SITE.email, href: `mailto:${SITE.email}` },
  ];
  return (
    <>
      <PageHeader image="/images/about/why-what-2.webp"
        crumbs={[{ name: "Support", path: "/support" }]}
        eyebrow="Support"
        title="We're here to help."
        intro="Questions about a device, a plan or an order? Reach us any of these ways."
      />
      <ul className="container-page grid gap-4 py-12 md:grid-cols-3">
        {items.map(({ icon: Icon, title, body, href }) => (
          <li key={title} className="rounded-3xl border border-line bg-paper p-7">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-sand text-clay-700">
              <Icon className="size-6" aria-hidden />
            </span>
            <h2 className="mt-4 text-xl font-semibold">{title}</h2>
            {href ? <a href={href} className="link mt-1 inline-block break-all">{body}</a> : <p className="mt-1 text-muted">{body}</p>}
          </li>
        ))}
      </ul>
    </>
  );
}
