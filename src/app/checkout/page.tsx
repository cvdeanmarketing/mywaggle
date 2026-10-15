"use client";

import { Check, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { commerce } from "@/lib/commerce/local-provider";
import { itemsFromLines, track } from "@/lib/analytics";
import { cn, money } from "@/lib/format";
import { CartLines } from "@/components/cart/CartLines";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { PlanDisclosure } from "@/components/cart/PlanDisclosure";
import { PromoField } from "@/components/cart/PromoField";

type Step = 0 | 1 | 2 | 3;
const STEPS = ["Contact", "Shipping", "Payment", "Review"];

interface Info {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  marketing: boolean;
}

const EMPTY: Info = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  apt: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  marketing: false,
};

export default function CheckoutPage() {
  const { detailed, lines, totals, clear } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<Step>(0);
  const [info, setInfo] = useState<Info>(EMPTY);
  const [errors, setErrors] = useState<
    Partial<Record<keyof Info | "ack", string>>
  >({});
  const [ack, setAck] = useState(false);
  const [placing, setPlacing] = useState(false);
  const began = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (began.current || lines.length === 0) return;
    began.current = true;
    track("begin_checkout", {
      currency: "USD",
      value: totals.total,
      coupon: totals.promotion?.code,
      items: itemsFromLines(lines),
    });
  }, [lines, totals]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const set =
    (k: keyof Info) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setInfo((i) => ({
        ...i,
        [k]:
          e.target.type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : e.target.value,
      }));

  const validate = (s: Step): boolean => {
    const e: typeof errors = {};
    if (s === 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email))
      e.email = "Enter a valid email.";
    if (s === 1) {
      if (!info.firstName.trim()) e.firstName = "Required.";
      if (!info.lastName.trim()) e.lastName = "Required.";
      if (!info.address.trim()) e.address = "Required.";
      if (!info.city.trim()) e.city = "Required.";
      if (!info.state) e.state = "Required.";
      if (!/^\d{5}(-\d{4})?$/.test(info.zip)) e.zip = "Enter a 5-digit ZIP.";
    }
    if (
      s === 3 &&
      totals.plans.some((p) => p.plan.requirement === "required") &&
      !ack
    )
      e.ack = "Please confirm you've reviewed the plan requirements.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    if (step === 1)
      track("add_shipping_info", {
        currency: "USD",
        value: totals.total,
        shipping_tier: "Standard (free)",
        items: itemsFromLines(lines),
      });
    if (step === 2)
      track("add_payment_info", {
        currency: "USD",
        value: totals.total,
        payment_type: "demo_hosted_placeholder",
        items: itemsFromLines(lines),
      });
    setStep((s) => Math.min(3, s + 1) as Step);
  };

  const place = async () => {
    if (!validate(3)) return;
    setPlacing(true);
    const session = await commerce.createCheckout(
      lines,
      totals.promotion?.code,
    );
    // In demo mode `track` rewrites `purchase` to `demo_purchase` so no revenue is recorded.
    track("purchase", {
      transaction_id: session.id,
      currency: "USD",
      value: totals.total,
      coupon: totals.promotion?.code,
      shipping: 0,
      items: itemsFromLines(lines),
    });
    try {
      sessionStorage.setItem(
        "waggle.lastOrder",
        JSON.stringify({
          id: session.id,
          email: info.email,
          total: totals.total,
          items: detailed.map((d) => ({
            name: d.product.name,
            quantity: d.quantity,
          })),
          plans: totals.plans.map((p) => p.plan.name),
        }),
      );
    } catch {
      /* ignore */
    }
    clear();
    router.push(session.redirectUrl);
  };

  if (detailed.length === 0 && !placing) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-3xl font-semibold">Your cart is empty</h1>
        <Link href="/shop" className="btn-primary mt-6">
          Shop all products
        </Link>
      </div>
    );
  }

  const field = (
    k: keyof Info,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
  ) => (
    <div>
      <label htmlFor={k} className="label">
        {label}
      </label>
      <input
        id={k}
        value={info[k] as string}
        onChange={set(k)}
        aria-invalid={Boolean(errors[k])}
        aria-describedby={errors[k] ? `${k}-err` : undefined}
        className={cn("field", errors[k] && "border-alert")}
        {...props}
      />
      {errors[k] && (
        <p id={`${k}-err`} className="mt-1 text-xs font-bold text-alert">
          {errors[k]}
        </p>
      )}
    </div>
  );

  return (
    <div className="bg-sand">
      <div className="container-page py-8 sm:py-12">
        <div className="mb-6 rounded-2xl border border-signal/25 bg-signal-50 px-4 py-3 text-sm">
          <strong>Demo checkout.</strong> No payment is taken and no card
          details are collected. Production checkout hands off to Shopify
          Checkout or a Stripe-hosted page.
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-[var(--radius-card)] bg-paper p-5 sm:p-8">
            <ol
              className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold"
              aria-label="Checkout steps"
            >
              {STEPS.map((s, i) => (
                <li
                  key={s}
                  className={cn(
                    "flex items-center gap-2",
                    i === step
                      ? "text-ink"
                      : i < step
                        ? "text-mint"
                        : "text-muted",
                  )}
                  aria-current={i === step ? "step" : undefined}
                >
                  <span
                    className={cn(
                      "flex size-6 items-center justify-center rounded-full border text-xs",
                      i === step && "border-ink bg-ink text-paper",
                      i < step && "border-mint bg-mint text-paper",
                    )}
                  >
                    {i < step ? (
                      <Check className="size-3.5" aria-hidden />
                    ) : (
                      i + 1
                    )}
                  </span>
                  {i < step ? (
                    <button
                      type="button"
                      onClick={() => setStep(i as Step)}
                      className="hover:underline"
                    >
                      {s}
                    </button>
                  ) : (
                    s
                  )}
                </li>
              ))}
            </ol>

            <form
              className="mt-8"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                if (step < 3) next();
                else place();
              }}
            >
              <h1
                ref={headingRef}
                tabIndex={-1}
                className="text-2xl font-semibold outline-none"
              >
                {STEPS[step]}
              </h1>

              {step === 0 && (
                <div className="mt-6 space-y-4">
                  {field("email", "Email", {
                    type: "email",
                    autoComplete: "email",
                    inputMode: "email",
                  })}
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={info.marketing}
                      onChange={set("marketing")}
                      className="size-4 accent-ink"
                    />
                    Email me pet safety tips and product news
                  </label>
                </div>
              )}

              {step === 1 && (
                <div className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {field("firstName", "First name", {
                      autoComplete: "given-name",
                    })}
                    {field("lastName", "Last name", {
                      autoComplete: "family-name",
                    })}
                  </div>
                  {field("address", "Address", {
                    autoComplete: "address-line1",
                  })}
                  {field("apt", "Apartment, suite, etc. (optional)", {
                    autoComplete: "address-line2",
                  })}
                  <div className="grid gap-4 sm:grid-cols-3">
                    {field("city", "City", { autoComplete: "address-level2" })}
                    <div>
                      <label htmlFor="state" className="label">
                        State
                      </label>
                      <select
                        id="state"
                        value={info.state}
                        onChange={set("state")}
                        autoComplete="address-level1"
                        className={cn("field", errors.state && "border-alert")}
                        aria-invalid={Boolean(errors.state)}
                      >
                        <option value="">Select</option>
                        {US_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <p className="mt-1 text-xs font-bold text-alert">
                          {errors.state}
                        </p>
                      )}
                    </div>
                    {field("zip", "ZIP code", {
                      autoComplete: "postal-code",
                      inputMode: "numeric",
                    })}
                  </div>
                  {field("phone", "Phone (optional, for delivery updates)", {
                    type: "tel",
                    autoComplete: "tel",
                  })}
                  <fieldset className="pt-2">
                    <legend className="label">Delivery</legend>
                    <label className="flex items-center justify-between rounded-xl border-2 border-ink p-4">
                      <span className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="ship"
                          defaultChecked
                          className="size-4 accent-ink"
                        />
                        <span>
                          <span className="block font-bold">
                            Standard shipping
                          </span>
                          <span className="text-xs text-muted">
                            Carrier estimate provided at launch
                          </span>
                        </span>
                      </span>
                      <span className="font-bold">Free</span>
                    </label>
                    <p className="mt-2 text-xs text-muted">
                      Expedited options and rates come from the shipping
                      provider once connected.
                    </p>
                  </fieldset>
                </div>
              )}

              {step === 2 && (
                <div className="mt-6">
                  <div className="rounded-2xl border border-line p-5">
                    <p className="flex items-center gap-2 font-bold">
                      <Lock className="size-4" aria-hidden /> Secure payment
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      In production, payment happens on a provider-hosted,
                      tokenized form (Shopify Checkout or Stripe Payment
                      Element). Card numbers never touch Waggle&apos;s servers.
                    </p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-3" aria-hidden>
                      {["Card", "Apple Pay", "Google Pay"].map((m) => (
                        <div
                          key={m}
                          className="rounded-xl border border-dashed border-line px-4 py-3 text-center text-sm font-bold text-muted"
                        >
                          {m}
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 flex items-center gap-2 text-xs text-muted">
                      <ShieldCheck className="size-4 text-mint" aria-hidden />{" "}
                      Demo mode: continue to review without entering payment
                      details.
                    </p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="mt-6 space-y-6">
                  <div className="grid gap-4 rounded-2xl bg-sand p-5 text-sm sm:grid-cols-2">
                    <div>
                      <p className="font-bold">Contact</p>
                      <p className="text-muted">{info.email}</p>
                    </div>
                    <div>
                      <p className="font-bold">Ship to</p>
                      <p className="text-muted">
                        {info.firstName} {info.lastName}, {info.address}
                        {info.apt ? `, ${info.apt}` : ""}, {info.city},{" "}
                        {info.state} {info.zip}
                      </p>
                    </div>
                  </div>
                  <CartLines compact />
                  <PlanDisclosure />
                  {totals.plans.some(
                    (p) => p.plan.requirement === "required",
                  ) && (
                    <div>
                      <label className="flex items-start gap-3 text-sm">
                        <input
                          type="checkbox"
                          checked={ack}
                          onChange={(e) => setAck(e.target.checked)}
                          className="mt-0.5 size-4 accent-ink"
                          aria-invalid={Boolean(errors.ack)}
                        />
                        <span>
                          I understand my cellular devices need a Waggle plan,
                          activated and billed separately in the Waggle app, and
                          that plans aren&apos;t charged today.
                        </span>
                      </label>
                      {errors.ack && (
                        <p className="mt-1 text-xs font-bold text-alert">
                          {errors.ack}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => (s - 1) as Step)}
                    className="text-sm font-bold text-muted hover:text-ink"
                  >
                    Back
                  </button>
                ) : (
                  <Link
                    href="/cart"
                    className="text-sm font-bold text-muted hover:text-ink"
                  >
                    Return to cart
                  </Link>
                )}
                <button
                  type="submit"
                  className="btn-primary py-3.5 sm:min-w-[240px]"
                  disabled={placing}
                >
                  {step < 3
                    ? `Continue to ${STEPS[step + 1]?.toLowerCase()}`
                    : placing
                      ? "Placing order…"
                      : `Place demo order · ${money(totals.total)}`}
                </button>
              </div>
            </form>
          </div>

          <aside className="lg:sticky lg:top-36 lg:self-start">
            <div className="rounded-[var(--radius-card)] bg-paper p-6">
              <h2 className="font-display text-xl font-semibold">
                Order summary
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                {detailed.map((d) => (
                  <li key={d.handle} className="flex justify-between gap-3">
                    <span className="text-muted">
                      {d.product.name} × {d.quantity}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <PromoField />
              </div>
              <div className="mt-5 border-t border-line pt-5">
                <OrderSummary />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

const US_STATES =
  "AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY".split(
    " ",
  );
