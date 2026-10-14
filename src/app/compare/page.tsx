import type { Metadata } from "next";
import { PageHeader } from "@/components/shop/PageHeader";
import { CompareTable } from "@/components/shop/CompareTable";

export const metadata: Metadata = {
  title: "Compare Waggle Pet Monitors and Cameras",
  description: "Compare Waggle devices side by side: connectivity, WiFi requirements, subscription plans and features like temperature alerts, live video and geofencing.",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  return (
    <>
      <PageHeader image="/images/about/how-waggle-1.webp"
        crumbs={[{ name: "Compare", path: "/compare" }]}
        eyebrow="Compare"
        title="Compare Waggle devices."
        intro="Choose up to four devices to compare how they connect, whether they need WiFi, what they can do, and what the plan costs."
      />
      <div className="container-page py-12">
        <CompareTable />
      </div>
    </>
  );
}
