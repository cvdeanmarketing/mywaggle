import type { Metadata } from "next";
import { PageHeader } from "@/components/shop/PageHeader";
import { VideoCard } from "@/components/ui/VideoCard";

export const metadata: Metadata = {
  title: "Pet Travel Videos: Traveling Tails",
  description:
    "Pet wellness, RV travel and road trip wellness video series from Waggle TV.",
  alternates: { canonical: "/videos" },
};

const SERIES: { name: string; blurb: string; videos: [string, string][] }[] = [
  {
    name: "Pet Wellness",
    blurb: "With Certified Professional Dog Trainer Jamie Bozzi.",
    videos: [
      ["Ml8cQW3yaRs", "How to Help Your Pet Settle and Relax"],
      ["JEed7rtUG4U", "How to Make Enrichment Toys at Home"],
      ["YfYJyGyWKWM", "Popular Food Puzzle Toys for Pets"],
      ["Z3_i0dM2zjc", "How to Get Your Pet to Drink Water"],
      ["w-ppuIg5KXc", "Play the Box Game"],
    ],
  },
  {
    name: "RV Travel",
    blurb: "A five-part season on the road, from packing up to storing the RV.",
    videos: [
      ["q4GH_wD4RN8", "Time to Pack Up and Hit the Road"],
      ["9u7eIoLXc-c", "Turning a Campsite Into Home"],
      ["V33agLKM0A4", "From Trail Time to Check-In Time"],
      ["Y_fLQ2Rk3Ww", "Packing Up and Heading Home"],
      ["mhZaIDKYseM", "Storing the RV Until Next Time"],
    ],
  },
  {
    name: "Road Trip Wellness",
    blurb: "Keeping pets calm, hydrated and comfortable on the move.",
    videos: [
      ["kJ9jZvjoKAY", "Preventing Travel Anxiety in Dogs"],
      ["rObBTrY9dno", "Keeping Pets Hydrated on the Road"],
      ["z2N_72AfiXI", "Creating a Comfortable RV Space for Your Pet"],
      ["O7lMFH8-jU0", "Signs Your Pet Needs a Travel Break"],
    ],
  },
];

export default function VideosPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Wag Reads", path: "/learn" },
          { name: "Pet Travel Videos", path: "/videos" },
        ]}
        eyebrow="From our community"
        title="Traveling Tails"
        intro="Travel with your pet confidently while Waggle helps keep them safe."
        image="/images/partners/ab-sec-5-1.webp"
      />
      <div className="container-page space-y-16 py-16 sm:py-20">
        {SERIES.map((s) => (
          <section key={s.name} aria-labelledby={s.name.replace(/\s/g, "-")}>
            <h2
              id={s.name.replace(/\s/g, "-")}
              className="text-3xl font-semibold"
            >
              {s.name}
            </h2>
            <p className="mt-1 text-muted">{s.blurb}</p>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {s.videos.map(([id, title]) => (
                <li key={id}>
                  <VideoCard id={id} title={title} tag={s.name} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
