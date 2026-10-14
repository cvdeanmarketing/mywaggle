"use client";

import { Check } from "lucide-react";
import { useId, useState } from "react";

/**
 * Lightweight interest form (no math captcha: a hidden honeypot field catches bots).
 * Demo mode confirms locally. Production: POST to a route handler that forwards to the CRM.
 */
export function InterestForm({
  source,
  fields,
  cta,
  success,
}: {
  source: string;
  fields: {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    options?: string[];
  }[];
  cta: string;
  success: string;
}) {
  const id = useId();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  if (done) {
    return (
      <p
        className="flex items-center gap-2 rounded-2xl bg-mint-50 p-5 font-bold"
        role="status"
      >
        <Check className="size-5 text-mint" aria-hidden /> {success}
      </p>
    );
  }
  return (
    <form
      noValidate
      data-source={source}
      className="grid gap-4 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        if (data.get("website")) return;
        for (const f of fields) {
          const v = String(data.get(f.name) ?? "").trim();
          if (f.required && !v) return setError(`${f.label} is required.`);
          if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
            return setError("Enter a valid email address.");
        }
        setError(null);
        setDone(true);
      }}
    >
      {fields.map((f) => (
        <div
          key={f.name}
          className={
            f.options || f.type === "textarea" ? "sm:col-span-2" : undefined
          }
        >
          <label htmlFor={`${id}-${f.name}`} className="label">
            {f.label}
            {f.required && <span className="text-alert"> *</span>}
          </label>
          {f.options ? (
            <select
              id={`${id}-${f.name}`}
              name={f.name}
              className="field"
              required={f.required}
            >
              <option value="">Select one</option>
              {f.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ) : f.type === "textarea" ? (
            <textarea
              id={`${id}-${f.name}`}
              name={f.name}
              rows={4}
              className="field"
              required={f.required}
            />
          ) : (
            <input
              id={`${id}-${f.name}`}
              name={f.name}
              type={f.type ?? "text"}
              className="field"
              required={f.required}
              autoComplete={
                f.type === "email"
                  ? "email"
                  : f.name === "name"
                    ? "name"
                    : undefined
              }
            />
          )}
        </div>
      ))}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      {error && (
        <p className="text-sm font-bold text-alert sm:col-span-2" role="alert">
          {error}
        </p>
      )}
      <div className="sm:col-span-2">
        <button className="btn-primary">{cta}</button>
      </div>
    </form>
  );
}
