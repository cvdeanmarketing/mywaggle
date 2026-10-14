/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  Compass,
  Crown,
  Handshake,
  Link2,
  PawPrint,
  MessagesSquare,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Store,
  Users,
  Wallet,
} from "lucide-react";
import {
  AMBASSADOR_ACTIVITIES,
  AMBASSADOR_TIERS,
  PARTNER_TRACKS,
  REFERRAL_TERMS,
} from "@/lib/programs";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InterestForm } from "@/components/ui/InterestForm";

export const metadata: Metadata = {
  title: "Partner with Waggle: Referrals, Ambassadors, Waggle Alpha & Business",
  description:
    "Refer a friend, become a Waggle ambassador, test new products in Waggle Alpha, or carry Waggle as a retail or brand partner.",
  alternates: { canonical: "/partners" },
};

type Track = (typeof PARTNER_TRACKS)[number];
const track = (id: Track["id"]) => PARTNER_TRACKS.find((t) => t.id === id)!;

const TRACK_ICON = {
  refer: Link2,
  ambassador: Users,
  alpha: Rocket,
  business: Store,
} as const;
const TRACK_TAGLINE = {
  refer: "Share a link. Earn when friends buy.",
  ambassador: "Represent Waggle on the road and at events.",
  alpha: "Test new products before anyone else.",
  business: "Carry Waggle or co-market with us.",
} as const;

function formFor(t: Track) {
  const success =
    t.id === "refer"
      ? "Thanks! Your referral link will be emailed to you."
      : "Thanks! The partnerships team will be in touch.";
  const fields =
    t.id === "business"
      ? [
          { name: "name", label: "Name", required: true },
          {
            name: "email",
            label: "Work email",
            type: "email" as const,
            required: true,
          },
          { name: "company", label: "Company", required: true },
          {
            name: "type",
            label: "Partnership type",
            options: [
              "Retail / reseller",
              "Wholesale",
              "Brand collaboration",
              "Other",
            ],
          },
        ]
      : t.id === "ambassador"
        ? [
            { name: "name", label: "Name", required: true },
            {
              name: "email",
              label: "Email",
              type: "email" as const,
              required: true,
            },
            {
              name: "travel",
              label: "How do you travel with your pet?",
              options: [
                "Full-time RV",
                "Part-time / weekend RV",
                "Road trips & camping",
                "Pet professional",
                "Content creator",
              ],
            },
            { name: "social", label: "Social or website link (optional)" },
          ]
        : [
            { name: "name", label: "Name", required: true },
            {
              name: "email",
              label: "Email",
              type: "email" as const,
              required: true,
            },
            ...(t.id === "alpha"
              ? [
                  {
                    name: "pet",
                    label: "Pet type",
                    options: ["Dog", "Cat", "Both", "Other"],
                  },
                ]
              : []),
          ];
  return (
    <InterestForm
      source={`partners-${t.id}`}
      cta={t.cta}
      success={success}
      fields={fields}
    />
  );
}

function FormCard({ t, dark = false }: { t: Track; dark?: boolean }) {
  return (
    <div
      className={
        dark
          ? "rounded-3xl bg-paper p-6 text-ink shadow-2xl sm:p-8"
          : "rounded-3xl border border-line bg-paper p-6 shadow-[var(--shadow-lift)] sm:p-8"
      }
    >
      <p className="mb-4 font-display text-xl font-semibold">{t.cta}</p>
      {formFor(t)}
    </div>
  );
}

export default function PartnersPage() {
  const pct = Math.round(REFERRAL_TERMS.commissionRate * 100);
  const refer = track("refer");
  const amb = track("ambassador");
  const alpha = track("alpha");
  const biz = track("business");
  const tierIcons = [Compass, Users, Crown];

  return (
    <>
      <header className="relative isolate overflow-hidden bg-ink text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 -z-10 size-[34rem] rounded-full bg-signal/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 right-0 -z-10 size-[30rem] rounded-full bg-clay/35 blur-3xl"
        />
        <div className="container-page pb-28 pt-8 sm:pb-32">
          <div className="[&_*]:!text-white/80">
            <Breadcrumbs
              items={[{ name: "Partner with Waggle", path: "/partners" }]}
            />
          </div>
          <div className="mt-6 grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em]">
                <PawPrint className="size-4 text-signal" aria-hidden />{" "}
                Ambassadors wanted
              </p>
              <h1 className="mt-5 text-[40px] font-semibold leading-[1.02] sm:text-6xl">
                Join the pack that keeps pets{" "}
                <span className="text-signal">safe on the road.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                RVers, pet parents, trainers and creators: represent Waggle at
                events, share your story, shape new products and earn perks
                along the way.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#ambassador"
                  className="inline-flex items-center gap-2 rounded-full bg-signal px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-signal-700"
                >
                  Become an ambassador{" "}
                  <ArrowRight className="size-4" aria-hidden />
                </a>
                <a
                  href="#refer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-base font-bold transition-colors hover:bg-white/10"
                >
                  Refer a friend
                </a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-2 text-sm font-bold">
                {[
                  "Event rep",
                  "Brand advocate",
                  "Community connector",
                  "Feedback insider",
                ].map((r) => (
                  <li
                    key={r}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="relative mx-auto grid w-full max-w-lg grid-cols-6 grid-rows-6 gap-3"
              aria-hidden
            >
              <img
                src="/images/partners/ab-sec-5-2.webp"
                alt=""
                className="col-span-4 row-span-4 size-full -rotate-2 rounded-3xl object-cover shadow-2xl"
              />
              <img
                src="/images/about/how-waggle-1.webp"
                alt=""
                className="col-span-2 col-start-5 row-span-3 row-start-2 size-full rotate-3 rounded-3xl object-cover shadow-2xl"
              />
              <img
                src="/images/partners/ab-sec-5-3.webp"
                alt=""
                className="col-span-3 row-span-2 row-start-5 size-full rotate-2 rounded-3xl object-cover shadow-2xl"
              />
              <img
                src="/images/partners/ab-sect-2.webp"
                alt=""
                className="col-span-3 col-start-4 row-span-2 row-start-5 size-full -rotate-1 rounded-3xl object-cover shadow-2xl"
              />
              <span className="absolute -left-3 top-6 rounded-2xl bg-paper px-4 py-2 text-sm font-bold text-ink shadow-xl">
                Represent Waggle at events
              </span>
              <span className="absolute -right-2 bottom-1/3 rounded-2xl bg-signal px-4 py-2 text-sm font-bold text-white shadow-xl">
                Earn exclusive perks
              </span>
            </div>
          </div>
        </div>
      </header>

      <section
        aria-label="Partner tracks"
        className="relative z-10 -mt-16 pb-4"
      >
        <ul className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNER_TRACKS.map((t) => {
            const Icon = TRACK_ICON[t.id];
            return (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-paper p-6 shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-1"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-clay-50 text-clay-700">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <span className="mt-4 font-display text-xl font-semibold">
                    {t.name}
                  </span>
                  <span className="mt-1 flex-1 text-sm text-muted">
                    {TRACK_TAGLINE[t.id]}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-signal">
                    Learn more{" "}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Refer a friend */}
      <section
        id="refer"
        className="scroll-mt-32 bg-paper py-16 sm:py-20"
        aria-labelledby="refer-title"
      >
        <div className="container-page">
          <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-clay-700">
            How it works
          </p>
          <h2
            id="refer-title"
            className="mx-auto mt-3 max-w-3xl text-center text-3xl font-semibold sm:text-[40px]"
          >
            Share. They shop. You earn.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted">
            {refer.summary}
          </p>

          <ol className="mt-12 grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
            {[
              {
                n: 1,
                icon: Link2,
                title: "Share your link",
                body: "Send your personal referral link to a friend with a pet they care about.",
              },
              {
                n: 2,
                icon: ShoppingCart,
                title: "Your friend orders",
                body: "They buy a Waggle device and activate their plan like any new customer.",
              },
              {
                n: 3,
                icon: Wallet,
                title: `You earn ${pct}%`,
                body: "Commission on their hardware order, paid once the return window closes and their plan is active.",
              },
            ].map((s, i) => (
              <li key={s.n} className="contents">
                <div className="relative rounded-3xl border border-line bg-sand p-7 text-center">
                  <span className="absolute -top-4 left-1/2 flex size-9 -translate-x-1/2 items-center justify-center rounded-full bg-ink font-display text-base font-bold text-paper">
                    {s.n}
                  </span>
                  <span className="mx-auto mt-2 flex size-14 items-center justify-center rounded-2xl bg-paper text-clay-700 shadow-sm">
                    <s.icon className="size-7" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
                {i < 2 && (
                  <ArrowRight
                    aria-hidden
                    className="mx-auto hidden size-6 self-center text-clay md:block"
                  />
                )}
              </li>
            ))}
          </ol>

          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              `${pct}% commission`,
              `Paid after the ${REFERRAL_TERMS.returnWindowDays}-day return window`,
              "One link per person",
              "Track referrals in your account",
            ].map((p) => (
              <li
                key={p}
                className="rounded-full border border-line bg-paper px-5 py-2.5 text-sm font-bold shadow-sm"
              >
                {p}
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div className="rounded-3xl bg-sand p-7 text-sm">
              <p className="font-display text-lg font-semibold">
                What counts as a qualifying referral
              </p>
              <ul className="mt-4 space-y-2.5 text-muted">
                {REFERRAL_TERMS.qualifying.map((q) => (
                  <li key={q} className="flex gap-2.5">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-mint"
                      aria-hidden
                    />{" "}
                    {q}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-muted">{REFERRAL_TERMS.legacyNote}</p>
              <p className="mt-2 text-muted">{REFERRAL_TERMS.noStacking}</p>
              <p className="mt-4 text-xs font-bold text-clay-700">
                Proposed terms, pending finance review.
              </p>
            </div>
            <FormCard t={refer} />
          </div>
        </div>
      </section>

      {/* Ambassadors */}
      <section
        id="ambassador"
        className="scroll-mt-32 bg-sand py-16 sm:py-20"
        aria-labelledby="ambassador-title"
      >
        <div className="container-page">
          <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-clay-700">
            {amb.audience}
          </p>
          <h2
            id="ambassador-title"
            className="mx-auto mt-3 max-w-3xl text-center text-3xl font-semibold sm:text-[40px]"
          >
            Be the face of Waggle on the road.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted">
            {amb.summary}
          </p>

          <ul className="mx-auto mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "Community Connector",
                "You’re the one friends go to for advice. Help us reach more pet parents by being the friendly face of Waggle.",
              ],
              [
                "Event Rep",
                "Represent Waggle at events, meetups, and shows. Spread awareness about keeping pets safe on the road.",
              ],
              [
                "Brand Advocate",
                "Share stories, content, and experiences to inspire others and show how Waggle makes a difference.",
              ],
              [
                "Feedback Insider",
                "Help improve products by sharing real feedback and ideas only pet parents can provide.",
              ],
            ].map(([t, d]) => (
              <li key={t} className="rounded-3xl bg-paper p-6 shadow-sm">
                <h3 className="font-display text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted">{d}</p>
              </li>
            ))}
          </ul>

          <ol className="mt-12 grid items-end gap-4 md:grid-cols-3">
            {AMBASSADOR_TIERS.map((tier, i) => {
              const Icon = tierIcons[i]!;
              return (
                <li
                  key={tier.name}
                  className={`rounded-3xl p-7 ${i === 2 ? "bg-ink text-paper md:pb-12 md:pt-10" : i === 1 ? "border border-line bg-paper md:pb-9 md:pt-8" : "border border-line bg-paper"}`}
                >
                  <span
                    className={`flex size-12 items-center justify-center rounded-2xl ${i === 2 ? "bg-signal text-paper" : "bg-sand text-clay-700"}`}
                  >
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <p
                    className={`mt-4 text-xs font-bold uppercase tracking-[0.16em] ${i === 2 ? "text-signal" : "text-muted"}`}
                  >
                    Level {i + 1}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold">
                    {tier.name}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${i === 2 ? "text-muted-dark" : "text-muted"}`}
                  >
                    {tier.summary}
                  </p>
                </li>
              );
            })}
          </ol>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div className="space-y-6">
              <div className="rounded-3xl bg-paper p-7">
                <p className="font-display text-lg font-semibold">
                  What ambassadors do
                </p>
                <ul className="mt-4 space-y-2.5 text-sm text-muted">
                  {AMBASSADOR_ACTIVITIES.map((a) => (
                    <li key={a} className="flex gap-2.5">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-mint"
                        aria-hidden
                      />{" "}
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="flex flex-wrap gap-2">
                {amb.perks.map((p) => (
                  <li
                    key={p}
                    className="rounded-full bg-paper px-4 py-2 text-sm font-bold shadow-sm"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <FormCard t={amb} />
          </div>
        </div>
      </section>

      {/* Waggle Alpha */}
      <section
        id="alpha"
        className="relative scroll-mt-32 overflow-hidden bg-ink py-16 text-paper sm:py-20"
        aria-labelledby="alpha-title"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 size-[30rem] rounded-full bg-signal/25 blur-3xl"
        />
        <div className="container-page relative">
          <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-signal">
            {alpha.audience}
          </p>
          <h2
            id="alpha-title"
            className="mx-auto mt-3 max-w-3xl text-center text-3xl font-semibold sm:text-[40px]"
          >
            Try it first. Help shape what ships.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-dark">
            {alpha.summary}
          </p>

          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { icon: Rocket, title: alpha.perks[0] },
              { icon: MessagesSquare, title: alpha.perks[1] },
              { icon: ShieldCheck, title: alpha.perks[2] },
            ].map((p) => (
              <li
                key={p.title}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-signal text-paper">
                  <p.icon className="size-6" aria-hidden />
                </span>
                <p className="mt-4 font-display text-xl font-semibold">
                  {p.title}
                </p>
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-12 max-w-xl">
            <FormCard t={alpha} dark />
          </div>
        </div>
      </section>

      {/* Business partners */}
      <section
        id="business"
        className="scroll-mt-32 bg-paper py-16 sm:py-20"
        aria-labelledby="business-title"
      >
        <div className="container-page grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-clay-700">
              {biz.audience}
            </p>
            <h2
              id="business-title"
              className="mt-3 text-3xl font-semibold sm:text-[40px]"
            >
              Grow with Waggle.
            </h2>
            <p className="mt-4 text-lg text-muted">{biz.summary}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {biz.perks.map((p, i) => {
                const Icon = [Store, Handshake, Users][i]!;
                return (
                  <li key={p} className="rounded-2xl bg-sand p-5">
                    <Icon className="size-6 text-clay-700" aria-hidden />
                    <p className="mt-3 text-sm font-bold leading-snug">{p}</p>
                  </li>
                );
              })}
            </ul>
            <img
              src="/images/partners/ab-sec-5-2.webp"
              alt="Pet parent with her camera and dog on a beach blanket"
              width={573}
              height={424}
              loading="lazy"
              className="mt-8 aspect-[573/424] w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
            />
          </div>
          <FormCard t={biz} />
        </div>
      </section>
      <section
        id="community"
        className="scroll-mt-32 bg-sand py-16 sm:py-20"
        aria-labelledby="community-title"
      >
        <div className="container-page">
          <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-clay-700">
            Community
          </p>
          <h2
            id="community-title"
            className="mx-auto mt-3 max-w-3xl text-center text-3xl font-semibold sm:text-[40px]"
          >
            Meet us on the road, on air and online.
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "/events",
                "events/event-sec-2-img",
                "RV Events",
                "Rallies and shows we attend, and big events like NASCAR to suggest.",
              ],
              [
                "/live",
                "partners/ab-sec-5-3",
                "Waggle Live Sessions",
                "Free expert sessions with vets, trainers and full-time RVers.",
              ],
              [
                "/advisory-board",
                "about/advisory-board-prof-img-1",
                "Advisory Board",
                "The veterinary and training experts who advise our products.",
              ],
              [
                "/waggle-for-good",
                "about/how-waggle-1",
                "Waggle for Good",
                "Our mission to build a better life for pets and pet parents.",
              ],
            ].map(([href, img, t, d]) => (
              <li key={href}>
                <Link
                  href={href!}
                  className="group block h-full overflow-hidden rounded-3xl bg-paper shadow-sm transition-shadow hover:shadow-[var(--shadow-lift)]"
                >
                  <img
                    src={`/images/${img}.webp`}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold">{t}</h3>
                    <p className="mt-1 text-sm text-muted">{d}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-signal">
                      Explore <ArrowRight className="size-4" aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
