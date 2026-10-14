import type { Metadata } from "next";
import { PackageCheck, Printer, Search } from "lucide-react";
import { PageHeader } from "@/components/shop/PageHeader";
import { ReturnStart } from "@/components/support/ReturnStart";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Easy Returns",
  description:
    "Start a Waggle return in minutes: enter your order number, print your label and drop it off. 21-day returns.",
  alternates: { canonical: "/returns" },
};

const STEPS = [
  {
    icon: Search,
    title: "Enter your order number",
    text: "Use the number and email from your order confirmation.",
  },
  {
    icon: Printer,
    title: "Print your return label",
    text: "Print the label and slip, and pack your Waggle with them.",
  },
  {
    icon: PackageCheck,
    title: "Drop it off",
    text: "Hand the package to the carrier and you're done.",
  },
];

export default function ReturnsPage() {
  return (
    <>
      <PageHeader
        image="/images/partners/ab-sec-5-3.webp"
        crumbs={[{ name: "Returns", path: "/returns" }]}
        eyebrow="Easy returns"
        title="Easy returns."
        intro={`Not right for you? You have 21 days. Enter your order number, print your label and send it back.`}
      />
      <section className="container-page py-14 sm:py-16">
        <ol className="grid gap-5 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className="rounded-3xl border border-line bg-paper p-7 shadow-sm"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-signal-50 text-signal">
                <Icon className="size-6" aria-hidden />
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-clay-700">
                Step {i + 1}
              </p>
              <h2 className="mt-1 text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ol>
        <div className="mx-auto mt-12 max-w-2xl rounded-[28px] bg-sand p-6 sm:p-10">
          <h2 className="text-2xl font-semibold">Start your return</h2>
          <div className="mt-6">
            <ReturnStart />
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-muted">
          Need a hand? Email{" "}
          <a className="link" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>{" "}
          or call{" "}
          <a className="link" href={`tel:${SITE.phone.replace(/-/g, "")}`}>
            {SITE.phone}
          </a>
          .
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-center text-xs text-muted">
          Full return terms (condition, refunds, shipping) are being added here.
        </p>
      </section>
    </>
  );
}
