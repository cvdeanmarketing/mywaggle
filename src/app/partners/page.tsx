import type { Metadata } from "next";
import { Check } from "lucide-react";
import { AMBASSADOR_ACTIVITIES, AMBASSADOR_TIERS, PARTNER_TRACKS, REFERRAL_TERMS } from "@/lib/programs";
import { PageHeader } from "@/components/shop/PageHeader";
import { InterestForm } from "@/components/ui/InterestForm";

export const metadata: Metadata = {
  title: "Partner with Waggle: Referrals, Ambassadors, Waggle Alpha & Business",
  description: "Refer a friend, become a Waggle ambassador, test new products in Waggle Alpha, or carry Waggle as a retail or brand partner.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  const pct = Math.round(REFERRAL_TERMS.commissionRate * 100);
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Partner with Waggle", path: "/partners" }]}
        eyebrow="Partner with Waggle"
        title="Help more pets get home safe."
        intro="One place for every way to work with Waggle. Pick the track that fits you."
      >
        <nav aria-label="Partner tracks" className="mt-8 flex flex-wrap gap-2">
          {PARTNER_TRACKS.map((t) => (
            <a key={t.id} href={`#${t.id}`} className="chip px-4 py-2 text-sm hover:border-ink">{t.name}</a>
          ))}
        </nav>
      </PageHeader>

      <div className="container-page space-y-6 py-14">
        {PARTNER_TRACKS.map((t) => (
          <section key={t.id} id={t.id} className="scroll-mt-36 grid gap-8 rounded-[var(--radius-card)] border border-line p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr]" aria-labelledby={`${t.id}-title`}>
            <div>
              <p className="eyebrow">{t.audience}</p>
              <h2 id={`${t.id}-title`} className="mt-2 text-3xl font-semibold">{t.name}</h2>
              <p className="mt-3 text-muted">{t.summary}</p>
              <ul className="mt-5 space-y-2">
                {t.perks.map((p) => (
                  <li key={p} className="flex gap-2"><Check className="mt-1 size-4 shrink-0 text-mint" aria-hidden /> {p}</li>
                ))}
              </ul>

              {t.id === "refer" && (
                <div className="mt-6 rounded-2xl bg-sand p-5 text-sm">
                  <p className="font-bold">How rewards work</p>
                  <p className="mt-1 text-muted">
                    Earn {pct}% of your friend&apos;s {REFERRAL_TERMS.commissionBase}. {REFERRAL_TERMS.legacyNote}
                  </p>
                  <ul className="mt-3 space-y-1 text-muted">
                    {REFERRAL_TERMS.qualifying.map((q) => (
                      <li key={q}>• {q}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-muted">{REFERRAL_TERMS.noStacking}</p>
                  <p className="mt-3 text-xs font-bold text-clay-700">Proposed terms, pending finance review.</p>
                </div>
              )}

              {t.id === "ambassador" && (
                <div className="mt-6 space-y-4">
                  <div className="grid gap-2 sm:grid-cols-3">
                    {AMBASSADOR_TIERS.map((tier) => (
                      <div key={tier.name} className="rounded-2xl bg-sand p-4">
                        <p className="font-bold">{tier.name}</p>
                        <p className="mt-1 text-xs text-muted">{tier.summary}</p>
                      </div>
                    ))}
                  </div>
                  <ul className="space-y-1 text-sm text-muted">
                    {AMBASSADOR_ACTIVITIES.map((a) => (
                      <li key={a}>• {a}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="rounded-2xl bg-sand p-5 sm:p-6">
              <p className="mb-4 font-display text-lg font-semibold">{t.cta}</p>
              <InterestForm
                source={`partners-${t.id}`}
                cta={t.cta}
                success={t.id === "refer" ? "Thanks! Your referral link will be emailed to you." : "Thanks! The partnerships team will be in touch."}
                fields={
                  t.id === "business"
                    ? [
                        { name: "name", label: "Name", required: true },
                        { name: "email", label: "Work email", type: "email", required: true },
                        { name: "company", label: "Company", required: true },
                        { name: "type", label: "Partnership type", options: ["Retail / reseller", "Wholesale", "Brand collaboration", "Other"] },
                      ]
                    : t.id === "ambassador"
                      ? [
                          { name: "name", label: "Name", required: true },
                          { name: "email", label: "Email", type: "email", required: true },
                          { name: "travel", label: "How do you travel with your pet?", options: ["Full-time RV", "Part-time / weekend RV", "Road trips & camping", "Pet professional", "Content creator"] },
                          { name: "social", label: "Social or website link (optional)" },
                        ]
                      : [
                          { name: "name", label: "Name", required: true },
                          { name: "email", label: "Email", type: "email", required: true },
                          ...(t.id === "alpha" ? [{ name: "pet", label: "Pet type", options: ["Dog", "Cat", "Both", "Other"] }] : []),
                        ]
                }
              />
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
