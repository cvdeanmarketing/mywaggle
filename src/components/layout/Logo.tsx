import { cn } from "@/lib/format";
import { LOGO_PATH } from "./logo-path";

/** Official Waggle wordmark. Inherits color from `tone`. */
export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <svg viewBox="0 0 129 39" className={cn(className)} role="img" aria-label="Waggle">
      <path fill={tone === "dark" ? "#111318" : "#ffffff"} fillRule="evenodd" d={LOGO_PATH} />
    </svg>
  );
}
