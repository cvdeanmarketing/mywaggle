"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { money } from "@/lib/format";

interface LastOrder {
  id: string;
  email: string;
  total: number;
  items: { name: string; quantity: number }[];
  plans: string[];
}

const subscribe = () => () => {};
function readLastOrder(): string | null {
  try {
    return sessionStorage.getItem("waggle.lastOrder");
  } catch {
    return null;
  }
}

export default function ConfirmationPage() {
  const raw = useSyncExternalStore(subscribe, readLastOrder, () => null);
  const order = useMemo<LastOrder | null>(() => {
    try {
      return raw ? (JSON.parse(raw) as LastOrder) : null;
    } catch {
      return null;
    }
  }, [raw]);

  return (
    <div className="container-page max-w-2xl py-16 text-center sm:py-24">
      <CheckCircle2 className="mx-auto size-14 text-mint" aria-hidden />
      <h1 className="mt-6 text-4xl font-semibold">Demo order placed</h1>
      <p className="mt-3 text-muted">
        This was a prototype checkout. No payment was taken and nothing will
        ship. Analytics recorded a{" "}
        <code className="rounded bg-sand px-1">demo_purchase</code>, not a sale.
      </p>
      {order && (
        <div className="mt-10 rounded-[var(--radius-card)] border border-line p-6 text-left">
          <p className="text-sm text-muted">Order {order.id}</p>
          <ul className="mt-3 space-y-1">
            {order.items.map((i) => (
              <li key={i.name} className="flex justify-between">
                <span>{i.name}</span>
                <span className="text-muted">× {i.quantity}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex justify-between border-t border-line pt-4 font-bold">
            <span>Total</span>
            <span>{money(order.total)}</span>
          </p>
          {order.plans.length > 0 && (
            <div className="mt-5 rounded-2xl bg-sand p-4 text-sm">
              <p className="font-bold">Next: activate your plan</p>
              <p className="mt-1 text-muted">
                When your device arrives, open the Waggle app to activate{" "}
                {Array.from(new Set(order.plans)).join(" and ")}.
              </p>
            </div>
          )}
        </div>
      )}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className="btn-primary">
          Keep shopping
        </Link>
        <Link href="/learn" className="btn-secondary">
          Read Wag Reads
        </Link>
      </div>
    </div>
  );
}
