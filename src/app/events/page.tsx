/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import {
  CalendarDays,
  Flag,
  MapPin,
  PawPrint,
  Tent,
  Trophy,
} from "lucide-react";
import { InterestForm } from "@/components/ui/InterestForm";
import { PageHeader } from "@/components/shop/PageHeader";

export const metadata: Metadata = {
  title: "RV Events and Shows",
  description:
    "RV shows and rallies where Waggle has been and where to find the RV community in 2026.",
  alternates: { canonical: "/events" },
};

const PAST = [
  {
    name: "Hershey’s RV Show",
    date: "September 10–14, 2025",
    place: "Hershey, PA",
  },
  {
    name: "Southwest RV Supershow",
    date: "Mid-September 2025",
    place: "Dallas Market Hall, Texas",
  },
  { name: "Alliance Ally Rally", date: "May 27–29, 2026", place: "Goshen, IN" },
];

const EVENTS = [
  {
    date: "Jan 13–18, 2026",
    name: "Florida RV SuperShow",
    place: "Florida State Fairgrounds, Tampa, FL",
    text: "Massive public show with nearly 1,800 RVs from 40 manufacturers — a premier place to shop, compare, and buy new RV models, with a large vendor presence and helpful seminars.",
  },
  {
    date: "Mar 10–12, 2026",
    name: "Police K-9 Conference & Vendor Show",
    place: "Tuscany Suites & Casino, Las Vegas",
    text: "800+ attendees, including law enforcement and military working dog handlers, TSA, CBP, DHS personnel, and civilian K-9 trainers and enthusiasts.",
  },
  {
    date: "Mar 18–21, 2026",
    name: "FRVA’s 112th International Convention & RV Expo",
    place: "Georgia National Fairgrounds & Agricenter, Perry, GA",
    text: "Massive event with RV Expo (manufacturers/dealers), over 100 hours of seminars, social events, and on-site camping.",
  },
  {
    date: "Mar 25–29, 2026",
    name: "Grand Design Myrtle Beach Rally",
    place: "Sun Outdoors Myrtle Beach, Myrtle Beach, SC",
    text: "Large-scale RV rally featuring manufacturers, showcases, seminars, and community experiences.",
  },
  {
    date: "Apr 6–8, 2026",
    name: "Outdoorsy Group Summit 2026",
    place: "Austin, Texas",
    text: "3-day summit for RV hosts and industry leaders offering insights, workshops, networking, and strategies to grow and scale RV rental businesses.",
  },
  {
    date: "Apr 20–24, 2026",
    name: "Tiffin “Manatee Mingle” Rally",
    place: "Crystal River, FL",
    text: "Smaller regional rallies for Tiffin and Vanleigh RV owners focused on networking, socializing, and community gatherings.",
  },
  {
    date: "May 27–29, 2026",
    name: "Alliance Ally Rally",
    place: "Goshen, IN",
    text: "Owner-focused rally known for great community, factory representatives, technical seminars, and fellowship.",
  },
  {
    date: "Jun 14–19, 2026",
    name: "Escapade 2026",
    place: "Fryeburg Fair, Fryeburg, ME",
    text: "Large educational RV club rally featuring 60+ seminars, vendor exhibits, and extensive networking and social opportunities.",
  },
  {
    date: "Jul 1–4, 2026",
    name: "FRVA’s 113th International Convention & RV Expo",
    place: "Missouri State Fairgrounds, Sedalia, MO",
    text: "Large FRVA convention featuring educational seminars on safety and maintenance, and a large vendor area.",
  },
  {
    date: "Aug 16–22, 2026",
    name: "FROG International Rally",
    place: "Elkhart County 4-H Fairgrounds, Goshen, IN",
    text: "Forest River Owners Group event with factory service for eligible RVs, seminars, optional area tours, and a large vendor display.",
  },
  {
    date: "Aug 22–27, 2026",
    name: "Airstream Club International Rally",
    place: "Minot, North Dakota",
    text: "Premier event for Airstream owners featuring tours, social activities, maintenance seminars, and special programs.",
  },
  {
    date: "Aug 31–Sep 3, 2026",
    name: "Grand Design National Owners Rally",
    place: "Goshen, IN",
    text: "Largest owner-organized rally featuring factory tours, manufacturer support, seminars, and entertainment in the RV capital of the world.",
  },
];

export default function EventsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "RV Events", path: "/events" }]}
        eyebrow="Community"
        title="Trusted by RVers coast to coast"
        intro="We hit the road and landed at your favorite RV shows. Take a look at where we’ve been, and where the RV community is gathering in 2026."
        image="/images/events/event-sec-2-img.webp"
        imageAlt="Rows of RVs at an indoor RV show"
        bg="bg-clay-50"
      />
      <section className="container-page py-16 sm:py-20">
        <h2 className="text-center text-3xl font-semibold sm:text-4xl">
          Where we’ve been
        </h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {PAST.map((e, i) => (
            <li
              key={e.name}
              className="overflow-hidden rounded-3xl border border-line bg-paper shadow-sm"
            >
              <img
                src={`/images/events/${["event-image", "event-image-1", "event-image-2"][i]}.webp`}
                alt=""
                loading="lazy"
                className="aspect-[349/220] w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{e.name}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                  <CalendarDays className="size-4 text-clay" aria-hidden />
                  {e.date}
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                  <MapPin className="size-4 text-clay" aria-hidden />
                  {e.place}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-sand py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-center text-3xl font-semibold sm:text-4xl">
            Your roadmap to the biggest RV events of 2026
          </h2>
          <ol className="relative mx-auto mt-12 max-w-3xl space-y-5 border-l-2 border-clay/30 pl-8">
            {EVENTS.map((e) => (
              <li
                key={e.name + e.date}
                className="relative rounded-3xl bg-paper p-6 shadow-sm"
              >
                <span
                  aria-hidden
                  className="absolute -left-[2.6rem] top-8 size-4 rounded-full border-4 border-sand bg-clay"
                />
                <p className="text-xs font-bold uppercase tracking-wider text-clay-700">
                  {e.date}
                </p>
                <h3 className="mt-1 text-xl font-semibold">{e.name}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <MapPin className="size-4" aria-hidden />
                  {e.place}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">
                  {e.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section
        id="suggest"
        className="scroll-mt-32 bg-ink py-16 text-white sm:py-20"
      >
        <div className="container-page grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="eyebrow text-signal">Help us pick the next stop</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">
              Suggest a big event.
            </h2>
            <p className="mt-4 text-lg text-white/75">
              Pets and RVs show up wherever people gather. Tell us where Waggle
              should be next, from NASCAR race weekends to the biggest RV and
              dog shows.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                [
                  Flag,
                  "NASCAR race weekends",
                  "Infield and campground RV crowds travel with their dogs.",
                ],
                [
                  Tent,
                  "Major RV shows and rallies",
                  "Owner rallies, expos and manufacturer gatherings.",
                ],
                [
                  Trophy,
                  "Dog shows and K-9 events",
                  "Competitions, trials and working-dog conferences.",
                ],
                [
                  PawPrint,
                  "Festivals and music weekends",
                  "Camping festivals where pets come along.",
                ],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof Flag;
                return (
                  <li key={t as string} className="rounded-2xl bg-white/10 p-5">
                    <I className="size-6 text-signal" aria-hidden />
                    <p className="mt-3 font-display text-lg font-semibold">
                      {t as string}
                    </p>
                    <p className="mt-1 text-sm text-white/70">{d as string}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="rounded-3xl bg-paper p-6 text-ink sm:p-8">
            <p className="font-display text-xl font-semibold">
              Tell us where to go
            </p>
            <div className="mt-4">
              <InterestForm
                source="event-suggestion"
                cta="Send suggestion"
                success="Thanks! We'll add it to the list we review."
                fields={[
                  { name: "event", label: "Event name", required: true },
                  { name: "where", label: "City and dates, if you know them" },
                  {
                    name: "why",
                    label: "Why it's a fit for pets and pet parents",
                  },
                  {
                    name: "email",
                    label: "Your email",
                    type: "email",
                    required: true,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
