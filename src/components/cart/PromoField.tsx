"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";

export function PromoField() {
  const { promoCode, applyPromo, clearPromo, totals } = useCart();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  if (promoCode) {
    return (
      <div className="flex items-center justify-between rounded-xl bg-mint-50 px-4 py-3 text-sm">
        <span>
          <strong>{promoCode}</strong>{" "}
          {totals.discount > 0
            ? "applied"
            : "saved (applies when a device is in your cart)"}
        </span>
        <button
          type="button"
          onClick={clearPromo}
          className="font-bold text-muted hover:text-ink"
        >
          Remove
        </button>
      </div>
    );
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const r = applyPromo(code);
        setMsg({ ok: r.ok, text: r.message });
      }}
    >
      <label htmlFor="promo" className="label">
        Promo code
      </label>
      <div className="flex gap-2">
        <input
          id="promo"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="field py-2.5 uppercase"
          autoComplete="off"
          aria-describedby="promo-msg"
        />
        <button
          className="btn-secondary shrink-0 px-5 py-2.5"
          disabled={!code.trim()}
        >
          Apply
        </button>
      </div>
      {msg && (
        <p
          id="promo-msg"
          role="status"
          className={
            msg.ok
              ? "mt-2 text-xs font-bold text-mint"
              : "mt-2 text-xs font-bold text-alert"
          }
        >
          {msg.text}
        </p>
      )}
    </form>
  );
}
