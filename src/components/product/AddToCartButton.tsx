"use client";

import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/format";

export function AddToCartButton({
  handle,
  label = "Add to cart",
  className,
  variant = "primary",
  compact,
}: {
  handle: string;
  label?: string;
  className?: string;
  variant?: "primary" | "accent" | "secondary";
  compact?: boolean;
}) {
  const { add } = useCart();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        add(handle);
        setDone(true);
        setTimeout(() => setDone(false), 1600);
      }}
      className={cn(variant === "accent" ? "btn-accent" : variant === "secondary" ? "btn-secondary" : "btn-primary", compact && "px-4 py-2 text-sm", className)}
    >
      {done ? <Check className="size-4" aria-hidden /> : compact ? <Plus className="size-4" aria-hidden /> : null}
      <span>{done ? "Added" : label}</span>
    </button>
  );
}
