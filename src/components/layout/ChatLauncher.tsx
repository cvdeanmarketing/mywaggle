"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp, Mail, MessageCircle, Phone, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/site";

const QUICK = [
  { label: "Which Waggle is right for my pet?", href: "/find-your-waggle" },
  { label: "How do plans work?", href: "/plans" },
  { label: "Returns and warranty", href: "/returns" },
  { label: "Track or change an order", href: "/support" },
];

/** Floating chat launcher. Demo: quick links work; typed messages point to email/phone until a live chat vendor is connected. */
export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const [text, setText] = useState("");
  const reduce = useReducedMotion();

  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with Waggle"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="absolute bottom-[4.5rem] right-0 flex max-h-[min(34rem,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-[1.75rem] border border-line bg-paper shadow-[0_24px_64px_-12px_rgb(17_19_24/0.35)]"
          >
            <div className="relative bg-gradient-to-br from-ink via-ink to-signal-700 p-5 text-white">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="absolute right-3 top-3 rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" aria-hidden />
              </button>
              <div className="flex items-center gap-3">
                <span className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/pug.webp"
                    alt=""
                    width={48}
                    height={48}
                    className="size-12 rounded-full object-cover ring-2 ring-white/80"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-ink bg-mint" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold leading-tight">
                    Waggle Support
                  </p>
                  <p className="text-xs text-white/75">
                    24/7 chat support · replies fast
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto bg-sand/60 p-5">
              <p className="max-w-[85%] rounded-2xl rounded-tl-md bg-paper p-3.5 text-sm shadow-sm">
                Woof! 👋 I can help you pick a device, explain plans, or sort
                out an order. What can we help with?
              </p>
              <ul className="flex flex-wrap gap-2">
                {QUICK.map((q) => (
                  <li key={q.href}>
                    <Link
                      href={q.href}
                      onClick={() => setOpen(false)}
                      className="inline-block rounded-full border border-signal/30 bg-paper px-3.5 py-2 text-[13px] font-bold text-signal transition-colors hover:bg-signal hover:text-white"
                    >
                      {q.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {sent && (
                <>
                  <p className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-signal p-3.5 text-sm text-white shadow-sm">
                    {sent}
                  </p>
                  <p
                    className="max-w-[85%] rounded-2xl rounded-tl-md bg-paper p-3.5 text-sm shadow-sm"
                    role="status"
                  >
                    Thanks! This prototype isn’t connected to live agents yet.
                    Reach the team at{" "}
                    <a className="link" href={`mailto:${SITE.email}`}>
                      {SITE.email}
                    </a>{" "}
                    or {SITE.phone}.
                  </p>
                </>
              )}
            </div>
            <form
              className="flex items-center gap-2 border-t border-line bg-paper p-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (text.trim()) {
                  setSent(text.trim());
                  setText("");
                }
              }}
            >
              <label htmlFor="chat-input" className="sr-only">
                Type your message
              </label>
              <input
                id="chat-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message…"
                className="h-11 min-w-0 flex-1 rounded-full bg-sand px-4 text-sm outline-none focus:ring-2 focus:ring-signal"
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-signal text-white transition-transform hover:scale-105"
              >
                <ArrowUp className="size-5" aria-hidden />
              </button>
            </form>
            <div className="flex justify-center gap-5 border-t border-line bg-paper py-2.5 text-xs font-bold text-muted">
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center gap-1.5 hover:text-ink"
              >
                <Phone className="size-3.5" aria-hidden />
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-1.5 hover:text-ink"
              >
                <Mail className="size-3.5" aria-hidden />
                Email us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Chat with Waggle support"}
        className="group relative flex items-center gap-3 rounded-full bg-ink py-2.5 pl-2.5 pr-5 text-white shadow-[0_12px_32px_-8px_rgb(17_19_24/0.5)] ring-1 ring-white/10 transition-transform hover:scale-[1.04] active:scale-95"
      >
        {!open && !reduce && (
          <span
            aria-hidden
            className="absolute inset-0 -z-10 animate-ping rounded-full bg-signal/40 [animation-duration:2.6s]"
          />
        )}
        <span className="relative flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-signal to-signal-700">
          {open ? (
            <X className="size-5" aria-hidden />
          ) : (
            <MessageCircle className="size-5 fill-white/20" aria-hidden />
          )}
          {!open && (
            <span className="absolute -right-0.5 -top-0.5 size-3.5 rounded-full border-2 border-ink bg-mint" />
          )}
        </span>
        <span className="text-left leading-tight">
          <span className="flex items-center gap-1 text-sm font-bold">
            Chat with us{" "}
            <Sparkles className="size-3.5 text-signal" aria-hidden />
          </span>
          <span className="hidden text-[11px] text-white/70 sm:block">
            We’re online · 24/7
          </span>
        </span>
      </button>
    </div>
  );
}
