"use client";

import { Check } from "lucide-react";
import { useId, useState } from "react";

/** Waggle Alpha sign-up. Demo: confirms locally. Production: POST to a route handler that forwards to the CRM. */
export function AlphaForm() {
  const id = useId();
  const [done, setDone] = useState(false);
  if (done) {
    return (
      <p
        className="flex items-center gap-2 rounded-2xl bg-mint-50 p-5 font-bold"
        role="status"
      >
        <Check className="size-5 text-mint" aria-hidden /> All set! Give us 24
        hours, we’ll be wagging back soon!
      </p>
    );
  }
  return (
    <form
      className="grid gap-5 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        if (f.get("website")) return;
        setDone(true);
      }}
    >
      <div>
        <label htmlFor={`${id}-n`} className="label">
          Name<span className="text-alert">*</span>
        </label>
        <input
          id={`${id}-n`}
          name="name"
          required
          autoComplete="name"
          className="field rounded-full"
        />
      </div>
      <div>
        <label htmlFor={`${id}-e`} className="label">
          Email<span className="text-alert">*</span>
        </label>
        <input
          id={`${id}-e`}
          name="email"
          type="email"
          required
          autoComplete="email"
          className="field rounded-full"
        />
      </div>
      <fieldset>
        <legend className="label">Pet type</legend>
        <div className="flex gap-6 rounded-full bg-paper px-5 py-3">
          {["Dog", "Cat"].map((p, i) => (
            <label
              key={p}
              className="flex items-center gap-2 text-sm font-medium"
            >
              <input
                type="radio"
                name="pet"
                value={p}
                defaultChecked={i === 0}
                className="accent-signal"
              />{" "}
              {p}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor={`${id}-p`} className="label">
          Phone
        </label>
        <input
          id={`${id}-p`}
          name="phone"
          type="tel"
          autoComplete="tel"
          className="field rounded-full"
        />
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
        className="sm:col-span-2 rounded-full bg-signal px-8 py-4 text-base font-bold text-white transition-colors hover:bg-signal-700"
      >
        Sign me up
      </button>
    </form>
  );
}
