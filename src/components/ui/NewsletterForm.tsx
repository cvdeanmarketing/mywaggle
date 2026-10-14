"use client";

import { Check } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/format";

/**
 * Email capture. Demo mode: validates and confirms locally without sending.
 * Production: POST to the ESP (Klaviyo / Shopify Customer API) from a route handler.
 */
export function NewsletterForm({ tone = "light", source, cta = "Sign up", onSuccess }: { tone?: "light" | "dark"; source: string; cta?: string; onSuccess?: () => void }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  if (state === "done") {
    return (
      <p className={cn("mt-3 flex items-center gap-2 text-sm font-bold", tone === "dark" ? "text-paper" : "text-ink")} role="status">
        <Check className="size-4 text-mint" aria-hidden /> You&apos;re on the list.
      </p>
    );
  }
  return (
    <form
      noValidate
      data-source={source}
      onSubmit={(e) => {
        e.preventDefault();
        const hp = (e.currentTarget.elements.namedItem("company") as HTMLInputElement | null)?.value;
        if (hp) return;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setState("error");
        setState("done");
        onSuccess?.();
      }}
      className="mt-3"
    >
      <div className="flex gap-2">
        <label htmlFor={id} className="sr-only">Email address</label>
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          placeholder="you@example.com"
          aria-invalid={state === "error"}
          aria-describedby={state === "error" ? `${id}-err` : undefined}
          className={cn("field min-w-0 flex-1 py-2.5", tone === "dark" && "border-line-dark bg-ink-2 text-paper placeholder:text-muted-dark")}
        />
        <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <button type="submit" className={cn("btn shrink-0 px-5 py-2.5", tone === "dark" ? "bg-paper text-ink hover:bg-sand" : "bg-ink text-paper hover:bg-ink-3")}>
          {cta}
        </button>
      </div>
      {state === "error" && (
        <p id={`${id}-err`} className="mt-2 text-xs font-bold text-alert" role="alert">Enter a valid email address.</p>
      )}
    </form>
  );
}
