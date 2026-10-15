import { Activity, ArrowRight, FileText, MapPin } from "lucide-react";
import Link from "next/link";

export const SUITE = [
  {
    id: "vet",
    name: "Waggle Vet",
    icon: Activity,
    tone: "bg-mint-50 text-mint",
    text: "24/7 licensed vet access. Your pet's real-time data is shared instantly. No appointments, no waiting rooms. Just answers.",
  },
  {
    id: "vault",
    name: "Waggle Vault",
    icon: FileText,
    tone: "bg-clay-50 text-clay-700",
    text: "Secure digital pet health records. Vaccines, medications, vet visits, allergies. Accessible anywhere, shareable instantly.",
  },
  {
    id: "places",
    name: "Waggle Places",
    icon: MapPin,
    tone: "bg-signal-50 text-signal",
    text: "Pet-friendly campgrounds, rest stops, and services. Plan every leg of your trip knowing your pet is welcome.",
  },
] as const;

/** Homepage teaser for the Waggle Pet Suite (Vet, Vault, Places). */
export function PetSuite() {
  return (
    <section
      className="bg-paper pb-12 pt-0 sm:pb-20 sm:pt-4"
      aria-labelledby="suite-title"
    >
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-signal">Waggle Pet Suite</p>
          <h2
            id="suite-title"
            className="mt-3 text-3xl font-semibold sm:text-5xl"
          >
            Beyond monitoring. Complete care.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Three services built into every Waggle subscription.
          </p>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {SUITE.map(({ id, name, icon: Icon, tone, text }) => (
            <li key={id}>
              <Link
                href={`/pet-suite#${id}`}
                className="group flex h-full flex-col items-center rounded-[28px] border border-line bg-sand/50 p-8 text-center transition-all hover:-translate-y-1 hover:bg-paper hover:shadow-[var(--shadow-lift)]"
              >
                <span
                  className={`flex size-16 items-center justify-center rounded-2xl ${tone}`}
                >
                  <Icon className="size-8" aria-hidden />
                </span>
                <h3 className="mt-6 text-2xl font-semibold">{name}</h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-muted">
                  {text}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 font-bold text-signal">
                  Explore {name}{" "}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
