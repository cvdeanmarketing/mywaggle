import type { Metadata } from "next";
import { Clock, MessageCircle, MonitorPlay } from "lucide-react";
import { LIVE_SESSIONS } from "@/lib/live";
import { PageHeader } from "@/components/shop/PageHeader";
import { InterestForm } from "@/components/ui/InterestForm";

export const metadata: Metadata = {
  title: "Waggle Live: Free Expert Sessions for Pet Parents",
  description:
    "Free live sessions with vets, trainers and full-time RVers on pet travel, behavior and safety. Ask your question on air and get the replay.",
  alternates: { canonical: "/live" },
};

const WHY = [
  {
    icon: MessageCircle,
    t: "Your question, answered on air",
    d: "Type it in the chat and hear it answered: pacing at night, refusing the crate, travel nerves.",
  },
  {
    icon: Clock,
    t: "Forty-five useful minutes",
    d: "Straight to the checklist, the warning signs and the next step.",
  },
  {
    icon: MonitorPlay,
    t: "Watch any time",
    d: "Register once and get the replay and session notes afterwards.",
  },
];

export default function LivePage() {
  return (
    <>
      <PageHeader
        image="/images/partners/ab-sec-5-3.webp"
        crumbs={[
          { name: "Wag Reads", path: "/learn" },
          { name: "Waggle Live", path: "/live" },
        ]}
        eyebrow="Waggle Live"
        title="Real experts. Real answers. Free."
        intro="A vet, a trainer or a full-time RVer takes your questions live. Forty-five minutes, and you leave knowing exactly what to do next."
      />
      <section className="container-page py-14">
        <ul className="grid gap-4 md:grid-cols-3">
          {WHY.map(({ icon: Icon, t, d }) => (
            <li key={t} className="rounded-[var(--radius-card)] bg-sand p-6">
              <Icon className="size-6 text-clay-700" aria-hidden />
              <h2 className="mt-4 text-lg font-semibold">{t}</h2>
              <p className="mt-1 text-sm text-muted">{d}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="border-t border-line py-14" aria-labelledby="past">
        <div className="container-page">
          <h2 id="past" className="text-3xl font-semibold">
            Past sessions
          </h2>
          <p className="mt-2 text-muted">
            Sign up below and we&apos;ll send you replay links for the library.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LIVE_SESSIONS.map((s) => (
              <li
                key={s.title}
                className="flex flex-col rounded-[var(--radius-card)] border border-line p-6"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-clay-700">
                  {s.topic === "rv"
                    ? "RV"
                    : s.topic === "behavior"
                      ? "Training & behavior"
                      : s.topic === "travel"
                        ? "Travel"
                        : "Well-being"}
                  {s.minutes ? ` · ${s.minutes} min` : ""}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{s.summary}</p>
                <p className="mt-4 border-t border-line pt-4 text-sm">
                  <strong>{s.speaker}</strong>
                  <span className="block text-muted">{s.credential}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section
        id="notify"
        className="bg-sand py-14 sm:py-20"
        aria-labelledby="notify-title"
      >
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 id="notify-title" className="text-3xl font-semibold">
              Be first in line for the next session
            </h2>
            <p className="mt-3 text-muted">
              Early invites, speaker announcements, reminders and replay links.
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] bg-paper p-6 sm:p-8">
            <InterestForm
              source="waggle-live"
              cta="Get notified"
              success="You're on the list. Watch your inbox for the next invite."
              fields={[
                { name: "name", label: "First name", required: true },
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                  required: true,
                },
                {
                  name: "topic",
                  label: "What would you like to learn about?",
                  options: [
                    "Travel & RVing with pets",
                    "Training & behavior",
                    "Health & safety",
                    "Something else",
                  ],
                },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
