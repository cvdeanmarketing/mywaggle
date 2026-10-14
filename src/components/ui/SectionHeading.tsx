import { cn } from "@/lib/format";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  className,
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      {eyebrow && <p className={cn("eyebrow", tone === "dark" && "text-[#5aa8ff]")}>{eyebrow}</p>}
      <h2 id={id} className={cn("mt-3 text-3xl font-semibold leading-[1.1] sm:text-[42px]", tone === "dark" && "text-paper")}>
        {title}
      </h2>
      {intro && <p className={cn("mt-4 text-lg leading-relaxed", tone === "dark" ? "text-muted-dark" : "text-muted")}>{intro}</p>}
    </div>
  );
}
