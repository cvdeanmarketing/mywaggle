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
      <PageHeader
        crumbs={[{ name: "Compare", path: "/compare" }]}
        eyebrow="Compare"
        title="Find the difference that matters."
        intro="Pick up to four devices. Every row is in plain English, including whether it needs WiFi and what the plan costs."
      />
      <div className="container-page py-12">
        <CompareTable />
      </div>
    </>
  );
}
