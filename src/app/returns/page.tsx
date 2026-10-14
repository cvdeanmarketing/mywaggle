import type { Metadata } from "next";
import { PageHeader } from "@/components/shop/PageHeader";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Return Policy",
  description:
    "Waggle offers 21-day returns. Contact support to start a return.",
  alternates: { canonical: "/returns" },
};

export default function ReturnsPage() {
  return (
    <>
      <PageHeader
        image="/images/partners/ab-sec-5-3.webp"
        crumbs={[{ name: "Return Policy", path: "/returns" }]}
        eyebrow="Return policy"
        title="21-day returns."
        intro="If a Waggle isn't right for you, contact our team within 21 days and we'll help you start a return."
      />
      <div className="container-page max-w-3xl space-y-4 py-12 text-lg leading-relaxed text-muted">
        <p>
          Email{" "}
          <a className="link" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>{" "}
          or call{" "}
          <a className="link" href={`tel:${SITE.phone.replace(/-/g, "")}`}>
            {SITE.phone}
          </a>{" "}
          and we&apos;ll walk you through it.
        </p>
        <p className="text-sm">
          The full written return terms (condition, refunds, shipping) are being
          added here. Until then, our support team can answer any question.
        </p>
      </div>
    </>
  );
}
