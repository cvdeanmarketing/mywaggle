"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Info, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getProduct, priceOf, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { toGa4Item, track } from "@/lib/analytics";
import { cn, money } from "@/lib/format";
import { QUIZ, recommend, type QuizAnswers } from "@/lib/recommend";
import { ProductMedia } from "@/components/product/ProductMedia";
import { Price } from "@/components/product/Price";

type Partial4 = Partial<QuizAnswers>;

export function Quiz({ variant = "page" }: { variant?: "page" | "embedded" }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial4>({});
  const [started, setStarted] = useState(false);
  const { add, addMany } = useCart();

  const done = step >= QUIZ.length;
  const result = useMemo(() => (done ? recommend(answers as QuizAnswers) : null), [done, answers]);

  const choose = (key: keyof QuizAnswers, value: string) => {
    if (!started) {
      setStarted(true);
      track("quiz_started", { quiz_name: "find_your_waggle", placement: variant });
    }
    const next = { ...answers, [key]: value } as Partial4;
    setAnswers(next);
    const nextStep = step + 1;
    setStep(nextStep);
    if (nextStep >= QUIZ.length) {
      const r = recommend(next as QuizAnswers);
      track("quiz_completed", {
        quiz_name: "find_your_waggle",
        placement: variant,
        ...next,
        recommended_item: r.best.handle,
        alternative_item: r.alternative?.product.handle,
      });
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  const q = QUIZ[Math.min(step, QUIZ.length - 1)]!;

  return (
    <div className={cn("overflow-hidden rounded-[28px] bg-paper", variant === "embedded" && "border border-line shadow-[var(--shadow-lift)]")}>
      {!done && (
        <div className="px-5 pb-6 pt-6 sm:px-10 sm:pb-10 sm:pt-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-muted">
              Question {step + 1} of {QUIZ.length}
            </p>
            {step > 0 && (
              <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
                <ArrowLeft className="size-4" aria-hidden /> Back
              </button>
            )}
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-sand" aria-hidden>
            <motion.div className="h-full rounded-full bg-clay" initial={false} animate={{ width: `${(step / QUIZ.length) * 100}%` }} transition={{ duration: 0.4 }} />
          </div>
          <AnimatePresence mode="wait">
            <motion.fieldset
              key={q.key}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
              className="mt-7"
            >
              <legend className="font-display text-2xl font-semibold sm:text-3xl">{q.question}</legend>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {q.options.map((o) => {
                  const selected = answers[q.key] === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => choose(q.key, o.value)}
                      aria-pressed={selected}
                      className={cn(
                        "group flex min-h-[64px] items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left font-bold transition-all",
                        selected ? "border-ink bg-ink text-paper" : "border-line bg-paper hover:border-ink hover:bg-sand",
                      )}
                    >
                      {o.label}
                      <span className={cn("flex size-6 shrink-0 items-center justify-center rounded-full border", selected ? "border-paper" : "border-line group-hover:border-ink")}>
                        {selected && <Check className="size-3.5" aria-hidden />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.fieldset>
          </AnimatePresence>
        </div>
      )}

      {done && result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} aria-live="polite">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
            <ProductMedia
              product={result.best}
              bundleStack={result.best.kind === "bundle" ? (result.best.includes ?? []).map(getProduct).filter((p): p is Product => Boolean(p)) : undefined}
              className="aspect-[4/3] lg:aspect-auto lg:min-h-[460px]"
              priority
            />
            <div className="flex flex-col p-6 sm:p-10">
              <p className="eyebrow">Your best fit</p>
              <h3 className="mt-2 text-3xl font-semibold">{result.best.name}</h3>
              <p className="mt-2 text-muted">{result.best.headline}</p>
              <Price product={result.best} className="mt-4" />
              <ul className="mt-5 space-y-2">
                {result.reasons.map((r) => (
                  <li key={r} className="flex gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-mint" aria-hidden />
                    {r}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    add(result.best.handle);
                    track("select_item", { item_list_name: "quiz_result", items: [toGa4Item(result.best, 1, { item_list_name: "quiz_result" })] });
                  }}
                  className="btn-primary"
                >
                  Add to cart
                </button>
                <Link href={`/products/${result.best.handle}`} className="btn-secondary">
                  View details
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-px border-t border-line bg-line md:grid-cols-3">
            <div className="bg-paper p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">Connectivity</p>
              <p className="mt-2 text-sm">{result.connectivity}</p>
              {result.wifiExcluded && (
                <p className="mt-3 flex gap-2 rounded-xl bg-sand p-3 text-xs text-muted">
                  <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                  WiFi-only cameras were left out because WiFi isn&apos;t reliable where you&apos;ll use it.
                </p>
              )}
            </div>
            <div className="bg-paper p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">Subscription</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {result.subscriptions.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <Link href="/plans" className="mt-2 inline-block text-xs font-bold text-signal hover:underline">
                How plans work
              </Link>
            </div>
            {result.alternative ? (
              <div className="bg-paper p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">Also consider</p>
                <Link href={`/products/${result.alternative.product.handle}`} className="mt-2 block font-bold hover:underline">
                  {result.alternative.product.name} · {money(priceOf(result.alternative.product))}
                </Link>
                <p className="mt-1 text-sm text-muted">{result.alternative.why}</p>
              </div>
            ) : (
              <div className="bg-paper p-6" />
            )}
          </div>

          <div className="flex flex-col gap-4 border-t border-line bg-sand p-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted">Complete the setup</p>
              <p className="mt-1 font-bold">
                {result.bundle.name}:{" "}
                <span className="font-normal text-muted">
                  {result.bundle.handles
                    .map(getProduct)
                    .filter(Boolean)
                    .map((p) => p!.name)
                    .join(" + ")}
                </span>
              </p>
              <p className="mt-0.5 text-sm text-muted">{result.bundle.why}</p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              {result.bundle.published ? (
                <button type="button" className="btn-primary" onClick={() => add(result.bundle.published!.handle)}>
                  Add bundle · {money(priceOf(result.bundle.published))}
                </button>
              ) : result.bundle.handles.length > 1 ? (
                <button type="button" className="btn-primary" onClick={() => addMany(result.bundle.handles)}>
                  Add both · {money(result.bundle.handles.reduce((s, h) => s + (getProduct(h) ? priceOf(getProduct(h)!) : 0), 0))}
                </button>
              ) : null}
              <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-sm font-bold text-muted hover:text-ink">
                <RotateCcw className="size-4" aria-hidden /> Start over
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {!done && variant === "embedded" && step === 0 && (
        <p className="border-t border-line bg-sand px-5 py-3 text-center text-xs text-muted sm:px-10">
          Recommendations only include devices that work with your connectivity.{" "}
          <Link href="/find-your-waggle" className="font-bold text-ink hover:underline">
            Open full page <ArrowRight className="inline size-3" aria-hidden />
          </Link>
        </p>
      )}
    </div>
  );
}
