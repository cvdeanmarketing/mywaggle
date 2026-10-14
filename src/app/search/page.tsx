import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "./SearchResults";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-20 text-muted">Loading results…</div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
