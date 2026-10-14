import type { Metadata } from "next";
import { Check } from "lucide-react";
import Link from "next/link";
import {
  getProduct,
  perDayLabel,
  planPricing,
  plans,
  products,
} from "@/lib/catalog";
import { PLANS_FAQS } from "@/lib/content/faqs";
import { money } from "@/lib/format";
import { PageHeader } from "@/components/shop/PageHeader";
import { Faq } from "@/components/ui/Faq";

export const metadata: Metadata = {
  title: "Waggle Subscription Plans Explained",
  description:
    "What Waggle plans cost, what they include, and which devices need one. Yearly, monthly and per-day pricing.",
  alternates: { canonical: "/plans" },
};

export default function PlansPage() {
  return (
    <>
      <PageHeader
        image="/images/about/why-what-2.webp"
        crumbs={[{ name: "Subscription plans", path: "/plans" }]}
        eyebrow="Plans"
        title="The connection is the protection."
        intro="Cellular devices need a plan because the plan is their internet connection, the data that lets alerts reach you without WiFi. Here's exactly what each costs and includes."
      />
      <div className="container-page py-14">
        <ul className="grid gap-4 lg:grid-cols-2">
          {plans.map((plan) => {
            const { yearly, yearlyPerMonth, perDay } = planPricing(plan);
            const devicesUsing = products
              .filter((p) => p.kind === "device" && p.planId === plan.id)
              .map((p) => p.handle);
            return (
              <li
                key={plan.id}
                className="flex flex-col rounded-[var(--radius-card)] border border-line p-6 sm:p-8"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-muted">
                  {plan.requirement === "required" ? "Required" : "Optional"}
                </p>
                <h2 className="mt-2 text-2xl font-semibold">{plan.name}</h2>
                {yearly ? (
                  <p className="mt-4">
                    <span className="font-display text-4xl font-semibold">
                      {money(yearly)}
                    </span>
                    <span className="text-muted">/yr</span>
                    <span className="mt-1 block text-sm font-semibold text-signal">
                      ≈ {money(yearlyPerMonth!)}/mo · {perDayLabel(perDay!)}
                    </span>
                  </p>
                ) : (
                  <p className="mt-4 text-muted">
                    Pricing confirmed at activation
                  </p>
                )}
                {plan.options.filter((o) => o.interval !== "year").length >
                  0 && (
                  <p className="mt-2 text-sm text-muted">
                    Also:{" "}
                    {plan.options
                      .filter((o) => o.interval !== "year")
                      .map((o) => `${o.label} ${money(o.price)}/${o.interval}`)
                      .join(" · ")}
                  </p>
                )}
                {plan.trial && (
                  <p className="mt-2 text-sm font-bold text-mint">
                    {plan.trial}
                  </p>
                )}
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {plan.requirementNote}
                </p>
                <ul className="mt-5 space-y-2 text-sm">
                  {plan.includes.map((i) => (
                    <li key={i} className="flex gap-2">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-mint"
                        aria-hidden
                      />
                      {i}
                    </li>
                  ))}
                </ul>
                {devicesUsing.length > 0 && (
                  <p className="mt-auto border-t border-line pt-5 text-sm">
                    <span className="text-muted">For: </span>
                    {devicesUsing.map((h, i) => (
                      <span key={h}>
                        {i > 0 && ", "}
                        <Link
                          href={`/products/${h}`}
                          className="font-bold hover:underline"
                        >
                          {getProduct(h)?.name}
                        </Link>
                      </span>
                    ))}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-sm text-muted">
          Plans are activated and billed through the Waggle app after your
          device arrives. They&apos;re shown here and in your cart before you
          buy, but they&apos;re not charged at checkout.
        </p>
        <div className="mt-16 grid gap-10 lg:grid-cols-[0.7fr_1.6fr]">
          <h2 className="text-3xl font-semibold">Plan questions</h2>
          <Faq items={PLANS_FAQS} withSchema />
        </div>
      </div>
    </>
  );
}
