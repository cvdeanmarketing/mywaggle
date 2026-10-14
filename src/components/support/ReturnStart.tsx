"use client";

import { Printer } from "lucide-react";
import { useId, useState } from "react";

const REASONS = [
  "Not what I expected",
  "Doesn't fit my setup",
  "Ordered by mistake",
  "Arrived damaged or not working",
  "Found a better option",
  "Other",
];

/**
 * Start-a-return flow. Demo: it shows the printable return slip but does not look up a real order or
 * create a carrier label. Production: look up the order by number and email, then generate a prepaid label.
 */
export function ReturnStart() {
  const id = useId();
  const [slip, setSlip] = useState<{
    order: string;
    email: string;
    reason: string;
  } | null>(null);

  if (slip) {
    return (
      <div>
        <div
          id="return-slip"
          className="rounded-3xl border-2 border-dashed border-ink/30 bg-paper p-6 sm:p-8"
        >
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-clay-700">
            Return slip
          </p>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-bold uppercase text-muted">
                Order number
              </dt>
              <dd className="text-xl font-semibold">{slip.order}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase text-muted">Email</dt>
              <dd className="text-xl font-semibold">{slip.email}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-bold uppercase text-muted">Reason</dt>
              <dd className="font-semibold">{slip.reason}</dd>
            </div>
          </dl>
          <div className="mt-6 flex min-h-32 items-center justify-center rounded-2xl bg-sand p-4 text-center text-sm text-muted">
            Your prepaid shipping label appears here once returns are connected
            to the order system.
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-primary px-6 py-3"
          >
            <Printer className="size-4" aria-hidden /> Print return label
          </button>
          <button
            type="button"
            onClick={() => setSlip(null)}
            className="btn-secondary"
          >
            Start over
          </button>
        </div>
        <p className="mt-4 text-sm text-muted print:hidden">
          Demo only: no order was looked up and no label was created.
        </p>
      </div>
    );
  }
  return (
    <form
      className="grid gap-5 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        if (f.get("website")) return;
        setSlip({
          order: String(f.get("order") ?? ""),
          email: String(f.get("email") ?? ""),
          reason: String(f.get("reason") ?? ""),
        });
      }}
    >
      <div>
        <label htmlFor={`${id}-o`} className="label">
          Order number<span className="text-alert"> *</span>
        </label>
        <input
          id={`${id}-o`}
          name="order"
          required
          placeholder="#1234"
          className="field"
        />
      </div>
      <div>
        <label htmlFor={`${id}-e`} className="label">
          Email on the order<span className="text-alert"> *</span>
        </label>
        <input
          id={`${id}-e`}
          name="email"
          type="email"
          required
          autoComplete="email"
          className="field"
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-r`} className="label">
          Reason for the return
        </label>
        <select id={`${id}-r`} name="reason" className="field">
          {REASONS.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <button
        type="submit"
        className="btn-primary sm:col-span-2 px-7 py-3.5 text-base"
      >
        Get my return label
      </button>
    </form>
  );
}
