import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SECTIONS, type Article } from "@/lib/content/articles";
import { cn } from "@/lib/format";

const TONE: Record<Article["tone"], string> = {
  clay: "bg-clay text-paper",
  signal: "bg-signal text-paper",
  mint: "bg-mint text-paper",
  ink: "bg-ink text-paper",
};

export function ArticleCard({ a, large }: { a: Article; large?: boolean }) {
  return (
    <Link href={`/learn/${a.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper">
      <div className={cn("flex flex-col justify-between p-6", large ? "aspect-[16/8]" : "aspect-[16/9]", TONE[a.tone])}>
        <span className="text-xs font-bold uppercase tracking-wider opacity-80">{SECTIONS[a.section].name}</span>
        <span className={cn("font-display font-semibold leading-tight", large ? "text-3xl sm:text-4xl" : "text-2xl")}>{a.title}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex-1 text-sm leading-relaxed text-muted">{a.description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold">
          {a.readMinutes} min read <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
