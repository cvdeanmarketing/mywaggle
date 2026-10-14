import { Plus } from "lucide-react";
import type { FaqItem } from "@/lib/catalog";
import { JsonLd } from "@/components/seo/JsonLd";

export function Faq({ items, withSchema }: { items: FaqItem[]; withSchema?: boolean }) {
  return (
    <>
      <div className="divide-y divide-line border-y border-line">
        {items.map((f) => (
          <details key={f.q} className="group py-1">
            <summary className="flex items-center justify-between gap-6 py-5 text-left font-display text-lg font-medium">
              {f.q}
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-300 group-open:rotate-45">
                <Plus className="size-4" aria-hidden />
              </span>
            </summary>
            <p className="max-w-3xl pb-6 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      )}
    </>
  );
}
