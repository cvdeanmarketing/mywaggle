"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { PROMO_MODAL, findPromotion } from "@/lib/commerce/promotions";
import { track } from "@/lib/analytics";
import { useCart } from "@/lib/cart";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

const DISMISS_KEY = "waggle.promo.dismissedAt";
const SESSION_KEY = "waggle.promo.shown";
const PAGES_KEY = "waggle.promo.pages";
const ENGAGED_KEY = "waggle.promo.engaged";

function safeGet(store: Storage | undefined, key: string): string | null {
  try {
    return store?.getItem(key) ?? null;
  } catch {
    return null;
  }
}
function safeSet(store: Storage | undefined, key: string, value: string) {
  try {
    store?.setItem(key, value);
  } catch {
    /* ignore */
  }
}

/**
 * Engagement-triggered offer. Never shows on arrival: it waits until the
 * visitor scrolls ~70% down a page or reaches their third page (two clicks),
 * or shows exit intent after that; then respects dismissal and session caps.
 */
export function PromoModal() {
  const pathname = usePathname();
  const { applyPromo } = useCart();
  const [open, setOpen] = useState(false);
  const [joined, setJoined] = useState(false);
  const [applied, setApplied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const promo = PROMO_MODAL.offerCode ? findPromotion(PROMO_MODAL.offerCode) : undefined;

  const suppressed = PROMO_MODAL.suppressOn.some((p) => pathname.startsWith(p));

  const eligible = useCallback(() => {
    if (!PROMO_MODAL.enabled || suppressed) return false;
    if (PROMO_MODAL.oncePerSession && safeGet(globalThis.sessionStorage, SESSION_KEY)) return false;
    const dismissed = Number(safeGet(globalThis.localStorage, DISMISS_KEY) ?? 0);
    return !dismissed || Date.now() - dismissed > PROMO_MODAL.dismissDays * 86_400_000;
  }, [suppressed]);

  const show = useCallback(() => {
    if (!eligible()) return;
    safeSet(globalThis.sessionStorage, SESSION_KEY, "1");
    setOpen(true);
    track("promotion_viewed", { promotion_id: promo?.code ?? "email-capture", promotion_name: promo?.label ?? "Email capture", creative_slot: "engagement_modal" });
  }, [eligible, promo]);

  // Count pages viewed this visit; the modal waits for real engagement.
  useEffect(() => {
    const views = Number(safeGet(globalThis.sessionStorage, PAGES_KEY) ?? 0) + 1;
    safeSet(globalThis.sessionStorage, PAGES_KEY, String(views));
    if (views >= PROMO_MODAL.minPageViews) safeSet(globalThis.sessionStorage, ENGAGED_KEY, "1");
  }, [pathname]);

  useEffect(() => {
    if (!eligible()) return;
    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      show();
    };
    const engaged = () => safeGet(globalThis.sessionStorage, ENGAGED_KEY) === "1";
    if (engaged() && safeGet(globalThis.sessionStorage, PAGES_KEY) === String(PROMO_MODAL.minPageViews)) {
      // Arrived on the qualifying page: give it a moment to render first.
      const t = setTimeout(fire, 1500);
      return () => clearTimeout(t);
    }
    const arrivedAt = Date.now();
    const onScroll = () => {
      // Right after navigation the old page's scroll position briefly carries over; ignore it.
      if (Date.now() - arrivedAt < 1200) return;
      // Only count deliberate scrolling on a page long enough to scroll; short pages and
      // the scroll reset that comes with navigation don't qualify.
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable < window.innerHeight) return;
      const depth = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (depth >= PROMO_MODAL.minScrollDepth && window.scrollY > window.innerHeight * 0.8) {
        safeSet(globalThis.sessionStorage, ENGAGED_KEY, "1");
        fire();
      }
    };
    const onLeave = (e: MouseEvent) => {
      if (PROMO_MODAL.exitIntent && e.clientY <= 0 && engaged()) fire();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [eligible, show, pathname]);

  const dismiss = useCallback(() => {
    safeSet(globalThis.localStorage, DISMISS_KEY, String(Date.now()));
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dismiss]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ink/45" onClick={dismiss} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-title"
            className="relative w-full overflow-hidden rounded-t-3xl bg-paper sm:max-w-md sm:rounded-3xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={dismiss}
              className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full bg-paper/80 hover:bg-sand"
              aria-label="Close offer"
            >
              <X className="size-5" />
            </button>
            <div className="bg-sand px-7 pb-6 pt-9">
              <p className="eyebrow">Welcome to Waggle</p>
              <h2 id="promo-title" className="mt-2 font-display text-3xl font-semibold leading-tight">
                {promo ? <>{promo.label} your first order</> : <>Pet safety tips, straight to you</>}
              </h2>
              <p className="mt-2 text-sm text-muted">
                {promo
                  ? "Join the list for seasonal heat-safety reminders and product news, and take the code with you."
                  : "Seasonal heat-safety reminders, new product news and Waggle Live invites."}
              </p>
            </div>
            <div className="px-7 pb-7 pt-5">
              {!joined ? (
                <>
                  <NewsletterForm source="promo-modal" cta={promo ? "Get my code" : "Sign up"} onSuccess={() => setJoined(true)} />
                  {promo && (
                    <button type="button" onClick={() => setJoined(true)} className="mt-3 text-xs font-bold text-muted underline-offset-2 hover:underline">
                      Skip email, just show the code
                    </button>
                  )}
                </>
              ) : promo ? (
                <div className="text-center">
                  <p className="text-sm text-muted">Your code</p>
                  <p className="mt-1 rounded-2xl border-2 border-dashed border-clay/50 py-3 font-display text-2xl font-semibold tracking-widest">{promo.code}</p>
                  <button
                    type="button"
                    className="btn-primary mt-4 w-full"
                    onClick={() => {
                      applyPromo(promo.code);
                      setApplied(true);
                      setTimeout(dismiss, 900);
                    }}
                  >
                    {applied ? "Applied to your cart" : "Apply to my cart"}
                  </button>
                  <p className="mt-3 text-[11px] leading-snug text-muted">Applies to hardware, not subscription plans. One code per order.</p>
                </div>
              ) : (
                <p className="text-sm font-bold">Thanks, you&apos;re on the list.</p>
              )}
              <button type="button" onClick={dismiss} className="mt-4 w-full text-center text-sm font-bold text-muted hover:text-ink">
                No thanks
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
