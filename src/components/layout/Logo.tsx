import { cn } from "@/lib/format";

/** Text wordmark set in the brand display face. Swap for the official SVG logo when supplied. */
export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <svg viewBox="0 0 132 36" className={cn(className)} role="img" aria-label="Waggle">
      <text
        x="0"
        y="27"
        fontFamily="var(--font-lexend), ui-sans-serif, system-ui"
        fontWeight={500}
        fontSize="32"
        letterSpacing="-0.5"
        fill={tone === "dark" ? "#111318" : "#ffffff"}
      >
        waggle
      </text>
    </svg>
  );
}
