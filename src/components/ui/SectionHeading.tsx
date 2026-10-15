import { cn } from "@/lib/format";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
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
    <div
      className={cn(
        align === "center"
          ? "mx-auto text-center"
          : "max-md:mx-auto max-md:text-center",
        "max-w-4xl",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow", tone === "dark" && "text-signal")}>
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "mt-3 text-[28px] font-semibold leading-[1.15] sm:text-[38px]",
          tone === "dark" && "text-paper",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-lg leading-relaxed",
            "max-md:mx-auto",
            align === "center" && "mx-auto",
            tone === "dark" ? "text-muted-dark" : "text-muted",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
