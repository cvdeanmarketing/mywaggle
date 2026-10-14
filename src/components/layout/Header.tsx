"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  Smartphone,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  productsInCategory,
  products,
  priceOf,
  type Product,
} from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { SITE } from "@/lib/site";
import { cn, money } from "@/lib/format";
import { PRIMARY_NAV, type NavItem } from "@/lib/nav";
import { ProductArt } from "@/components/product/ProductArt";
import { Logo } from "./Logo";
import { SearchDialog } from "./SearchDialog";

function panelProducts(item: NavItem): Product[] {
  if (!item.category) {
    return products
      .filter((p) => p.kind === "device")
      .sort((a, b) => a.merchRank - b.merchRank)
      .slice(0, 4);
  }
  return productsInCategory(item.category).slice(0, 4);
}

export function Header() {
  const pathname = usePathname();
  const { totals, open: openCart } = useCart();
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menus on navigation (state adjusted during render rather than in an effect).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setActive(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    const closeOnScroll = () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", closeOnScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", closeOnScroll);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!active) return;
    const onDown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-site-header]"))
        setActive(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [active]);

  const openPanel = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActive(label);
  };

  const activeItem = PRIMARY_NAV.find((n) => n.label === active);

  return (
    <>
      <div className="bg-ink text-paper">
        <div className="container-page flex h-9 items-center justify-center gap-x-5 overflow-hidden text-center text-[12px] font-bold tracking-wide">
          <span>Free shipping</span>
          <span aria-hidden className="text-white/30">
            •
          </span>
          <span className="hidden sm:inline">Easy 21-day returns</span>
          <span aria-hidden className="hidden text-white/30 sm:inline">
            •
          </span>
          <span className="hidden md:inline">Lifetime limited warranty</span>
          <span aria-hidden className="hidden text-white/30 md:inline">
            •
          </span>
          <span className="hidden lg:inline">24/7 chat support</span>
          <span aria-hidden className="hidden text-white/30 lg:inline">
            •
          </span>
          <a
            href={SITE.appStore}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-signal hover:underline"
          >
            <Smartphone className="size-3.5" aria-hidden />
            Get the Waggle Pet App
            <span className="sr-only">(opens the App Store in a new tab)</span>
          </a>
        </div>
      </div>
      <header
        data-site-header
        className={cn(
          "sticky top-0 z-40 border-b bg-paper/90 backdrop-blur-xl transition-[border-color,box-shadow] duration-300",
          scrolled || active
            ? "border-line shadow-[0_6px_24px_-18px_rgba(17,19,24,0.35)]"
            : "border-transparent",
        )}
      >
        <div className="container-page relative flex h-16 items-center gap-4 lg:h-[72px]">
          <button
            type="button"
            className="-ml-2 inline-flex size-10 items-center justify-center rounded-full hover:bg-sand lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </button>
          <Link
            href="/"
            aria-label="Waggle home"
            className="relative shrink-0 max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2"
          >
            <Logo className="h-7 w-auto lg:h-8" />
            {/* A little tail that wags out of the header line, next to the logo. */}
            <svg
              aria-hidden
              viewBox="0 0 24 30"
              className="pointer-events-none absolute -bottom-[18px] left-full ml-1 h-[26px] w-[21px] origin-bottom-left animate-tail-wag text-ink lg:-bottom-5"
            >
              <path
                d="M2 30C2 18 6 8 18 3c3-1 5 2 2 5-8 5-9 12-9 22z"
                fill="currentColor"
              />
            </svg>
          </Link>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="ml-auto mr-2 hidden h-10 w-56 items-center gap-2.5 rounded-full border border-line bg-sand/60 px-4 text-left text-[14px] text-muted transition-colors hover:border-ink/30 lg:flex xl:w-64"
          >
            <Search className="size-[18px]" aria-hidden />
            Search
            <kbd className="ml-auto rounded-md border border-line bg-paper px-1.5 py-0.5 text-[11px] font-bold text-muted">
              ⌘K
            </kbd>
          </button>

          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-full hover:bg-sand lg:hidden"
              aria-label="Search products"
            >
              <Search className="size-5" />
            </button>
            <Link
              href="/account"
              className="hidden size-10 items-center justify-center rounded-full hover:bg-sand sm:inline-flex"
              aria-label="Account"
            >
              <UserRound className="size-5" />
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex size-10 items-center justify-center rounded-full hover:bg-sand"
              aria-label={`Open cart, ${totals.itemCount} ${totals.itemCount === 1 ? "item" : "items"}`}
            >
              <ShoppingBag className="size-5" />
              {totals.itemCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex min-w-[18px] items-center justify-center rounded-full bg-signal px-1 text-[10px] font-bold leading-[18px] text-paper">
                  {totals.itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <nav
          aria-label="Primary"
          className="hidden border-t border-line/70 lg:block"
        >
          <ul className="container-page flex h-12 items-center justify-center gap-1">
            {PRIMARY_NAV.map((item) => {
              const isActive = active === item.label;
              const current =
                pathname === item.href ||
                (item.href !== "/shop" && pathname.startsWith(item.href));
              return (
                <li key={item.label}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        // Desktop: click opens or closes the menu panel; "View all" inside it goes to the page.
                        if (window.matchMedia("(min-width: 1024px)").matches) {
                          e.preventDefault();
                          setActive(isActive ? null : item.label);
                        } else {
                          setActive(null);
                        }
                      }}
                      className={cn(
                        "whitespace-nowrap rounded-full px-2 py-2 text-[13px] font-bold transition-colors xl:px-3 xl:text-[14px]",
                        current ? "text-ink" : "text-ink/75 hover:text-ink",
                        isActive && "bg-sand text-ink",
                      )}
                      aria-current={current ? "page" : undefined}
                    >
                      {item.short ? (
                        <>
                          <span className="xl:hidden">{item.short}</span>
                          <span className="hidden xl:inline">{item.label}</span>
                        </>
                      ) : (
                        item.label
                      )}
                    </Link>
                    <button
                      type="button"
                      className="sr-only focus:not-sr-only focus:rounded-full focus:p-1"
                      aria-expanded={isActive}
                      aria-controls="mega-panel"
                      aria-label={`Show ${item.label} menu`}
                      onClick={() =>
                        isActive ? setActive(null) : openPanel(item.label)
                      }
                    >
                      <ChevronDown className="size-4" />
                    </button>
                  </div>
                </li>
              );
            })}
            <li>
              <Link
                href="/find-your-waggle"
                className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-2 text-[13px] font-bold xl:ml-2 xl:px-4 xl:text-[14px] text-paper transition-colors hover:bg-ink-3"
              >
                <Sparkles className="size-4" aria-hidden />
                Find Your Waggle
              </Link>
            </li>
          </ul>
        </nav>

        <AnimatePresence>
          {activeItem && (
            <motion.div
              id="mega-panel"
              key="panel"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full hidden border-b border-line bg-paper lg:block"
              onClickCapture={(e) => {
                // Choosing any link in the panel closes it right away.
                if ((e.target as HTMLElement).closest("a")) {
                  if (closeTimer.current) clearTimeout(closeTimer.current);
                  setActive(null);
                }
              }}
            >
              <div className="container-page grid grid-cols-[260px_1fr] gap-10 py-8">
                <div className="flex flex-col">
                  {activeItem.links ? (
                    <p className="font-display text-2xl font-semibold">
                      {activeItem.label}
                    </p>
                  ) : (
                    <Link
                      href={activeItem.href}
                      className="group inline-flex items-center gap-1.5 font-display text-2xl font-semibold hover:text-signal"
                    >
                      View all{" "}
                      {activeItem.label === "Shop All"
                        ? "products"
                        : activeItem.label}
                      <ArrowRight
                        className="size-5 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </Link>
                  )}
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {activeItem.blurb}
                  </p>
                  <div className="mt-auto rounded-2xl bg-sand p-4">
                    <p className="text-sm font-bold">
                      Not sure where to start?
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      Four questions, one recommendation.
                    </p>
                    <Link
                      href="/find-your-waggle"
                      className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-signal hover:underline"
                    >
                      Find Your Waggle{" "}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </div>
                </div>
                {activeItem.links ? (
                  <ul className="grid max-w-lg content-start gap-y-0.5">
                    {activeItem.links.map((l, i) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          {...(l.href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className={cn(
                            "flex items-center justify-between rounded-xl px-4 py-3 hover:bg-sand",
                            i === 0
                              ? "bg-signal-50 font-bold text-signal"
                              : "font-bold",
                          )}
                        >
                          {l.label}
                          <ArrowRight
                            className="size-4 text-muted"
                            aria-hidden
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="grid grid-cols-4 gap-4">
                    {panelProducts(activeItem).map((p) => (
                      <li key={p.handle}>
                        <Link
                          href={`/products/${p.handle}`}
                          className="group block rounded-2xl p-2 transition-colors hover:bg-sand"
                        >
                          <div className="aspect-square overflow-hidden rounded-xl bg-sand group-hover:bg-paper">
                            <ProductArt
                              art={p.art}
                              title=""
                              className="size-full transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <p className="mt-3 text-sm font-bold">{p.name}</p>
                          <p className="mt-0.5 line-clamp-2 text-xs text-muted">
                            {p.tagline}
                          </p>
                          <p className="mt-1.5 text-sm font-bold">
                            {money(priceOf(p))}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onSearch={() => setSearchOpen(true)}
      />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function MobileNav({
  open,
  onClose,
  onSearch,
}: {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-y-0 left-0 flex w-[min(420px,92vw)] flex-col bg-paper"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "tween",
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <Logo className="h-7 w-auto" />
              <button
                type="button"
                onClick={onClose}
                className="inline-flex size-10 items-center justify-center rounded-full hover:bg-sand"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSearch();
                }}
                className="field flex items-center gap-2 text-left text-muted"
              >
                <Search className="size-4" aria-hidden /> Search products
              </button>
              <Link
                href="/find-your-waggle"
                className="mt-4 flex items-center justify-between rounded-2xl bg-signal p-4 text-paper"
              >
                <span>
                  <span className="block font-display text-lg font-semibold">
                    Find Your Waggle
                  </span>
                  <span className="text-sm text-white/80">
                    Four questions. One clear recommendation.
                  </span>
                </span>
                <ArrowRight className="size-5" aria-hidden />
              </Link>
              <ul className="mt-4 divide-y divide-line">
                {PRIMARY_NAV.map((item) => {
                  const list = panelProducts(item);
                  const isOpen = expanded === item.label;
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-4 text-left font-display text-lg font-semibold"
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : item.label)}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "size-5 transition-transform",
                            isOpen && "rotate-180",
                          )}
                          aria-hidden
                        />
                      </button>
                      {isOpen && (
                        <div className="pb-4">
                          <Link
                            href={item.href}
                            className="mb-2 inline-flex items-center gap-1 font-bold text-signal"
                          >
                            View all{" "}
                            {item.label === "Shop All"
                              ? "products"
                              : item.label}{" "}
                            <ArrowRight className="size-4" aria-hidden />
                          </Link>
                          <p className="text-sm text-muted">{item.blurb}</p>
                          {item.links ? (
                            <ul className="mt-2">
                              {item.links.slice(1).map((l) => (
                                <li key={l.href}>
                                  <Link
                                    href={l.href}
                                    className="block py-2 font-bold"
                                  >
                                    {l.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <>
                              <ul className="mt-3 grid grid-cols-2 gap-2">
                                {list.map((p) => (
                                  <li key={p.handle}>
                                    <Link
                                      href={`/products/${p.handle}`}
                                      className="block rounded-xl bg-sand p-2"
                                    >
                                      <ProductArt
                                        art={p.art}
                                        title=""
                                        className="aspect-square w-full"
                                      />
                                      <span className="mt-1 block text-xs font-bold leading-tight">
                                        {p.name}
                                      </span>
                                      <span className="text-xs text-muted">
                                        {money(priceOf(p))}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
              <ul className="mt-4 space-y-3 border-t border-line pt-4 text-sm font-bold">
                <li>
                  <Link href="/compare">Compare devices</Link>
                </li>
                <li>
                  <Link href="/plans">Subscription plans</Link>
                </li>
                <li>
                  <Link href="/learn">Wag Reads</Link>
                </li>
                <li>
                  <Link href="/partners">Partner with Waggle</Link>
                </li>
                <li>
                  <Link href="/account">Account</Link>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
