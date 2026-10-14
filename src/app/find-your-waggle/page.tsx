import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Quiz } from "@/components/shop/Quiz";

export const metadata: Metadata = {
  title: "Find Your Waggle: Pet Monitor & Camera Recommendation Quiz",
  description: "Answer four questions about what you're protecting, where, and your WiFi. Get a Waggle recommendation that works with your connectivity, with plan costs shown up front.",
  alternates: { canonical: "/find-your-waggle" },
};

export default function FindYourWagglePage() {
  return (
    <div className="bg-sand">
      <div className="container-page pb-20 pt-6">
        <Breadcrumbs items={[{ name: "Find Your Waggle", path: "/find-your-waggle" }]} />
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="eyebrow">Find Your Waggle</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-[56px] sm:leading-[1.05]">Four questions. One clear answer.</h1>
          <p className="mt-4 text-lg text-muted">
            Pets at home, a road trip, an RV, a cabin with no WiFi: tell us what you&apos;re protecting and we&apos;ll show you the plan we recommend as the best fit for you, with the right device.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-5xl">
          <Quiz />
        </div>
      </div>
    </div>
  );
}
