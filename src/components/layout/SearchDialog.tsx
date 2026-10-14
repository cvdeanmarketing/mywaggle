"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { priceOf, searchProducts } from "@/lib/catalog";
import { money } from "@/lib/format";
import { ProductArt } from "@/components/product/ProductArt";

const SUGGESTIONS = ["no wifi", "temperature", "camera", "rv", "treat", "satellite", "solar"];

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const listId = useId();
  const results = searchProducts(q).slice(0, 6);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
            className="relative mx-auto mt-0 w-full max-w-2xl bg-paper sm:mt-24 sm:rounded-3xl sm:shadow-2xl"
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                if (!q.trim()) return;
                onClose();
                router.push(`/search?q=${encodeURIComponent(q.trim())}`);
              }}
              className="flex items-center gap-3 border-b border-line px-5 py-4"
            >
              <Search className="size-5 text-muted" aria-hidden />
              <label htmlFor="site-search" className="sr-only">Search</label>
              <input
                id="site-search"
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search monitors, cameras, no-WiFi…"
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted/70"
                autoComplete="off"
                aria-controls={listId}
              />
              <button type="button" onClick={onClose} className="inline-flex size-9 items-center justify-center rounded-full hover:bg-sand" aria-label="Close search">
                <X className="size-5" />
              </button>
            </form>
            <div className="max-h-[70vh] overflow-y-auto p-3" id={listId} aria-live="polite">
              {q.trim() === "" ? (
                <div className="p-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">Popular searches</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button key={s} type="button" className="chip hover:border-ink" onClick={() => setQ(s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <p className="p-4 text-sm text-muted">
                  No products match “{q}”. Try{" "}
                  <Link href="/find-your-waggle" onClick={onClose} className="link">Find Your Waggle</Link> instead.
                </p>
              ) : (
                <ul>
                  {results.map((p) => (
                    <li key={p.handle}>
                      <Link href={`/products/${p.handle}`} onClick={onClose} className="flex items-center gap-4 rounded-2xl p-2 hover:bg-sand">
                        <span className="size-16 shrink-0 overflow-hidden rounded-xl bg-sand">
                          <ProductArt art={p.art} title="" className="size-full" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-bold">{p.name}</span>
                          <span className="block truncate text-sm text-muted">{p.tagline}</span>
                        </span>
                        <span className="font-bold">{money(priceOf(p))}</span>
                      </Link>
                    </li>
                  ))}
                  <li className="mt-2 border-t border-line px-2 pt-3">
                    <Link href={`/search?q=${encodeURIComponent(q)}`} onClick={onClose} className="inline-flex items-center gap-1 text-sm font-bold text-signal">
                      See all results <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
