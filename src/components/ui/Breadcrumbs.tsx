import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd } from "@/lib/seo";

export function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1 text-muted">
          {all.map((it, i) => (
            <li key={it.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="size-3.5" aria-hidden />}
              {i === all.length - 1 ? (
                <span aria-current="page" className="font-bold text-ink">
                  {it.name}
                </span>
              ) : (
                <Link href={it.path} className="hover:text-ink">
                  {it.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(all)} />
    </>
  );
}
