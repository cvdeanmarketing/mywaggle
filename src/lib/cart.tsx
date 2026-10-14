"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from "react";
import { getPlan, getProduct, priceOf, type Product, type SubscriptionPlan } from "@/lib/catalog";
import { findPromotion, type Promotion } from "@/lib/commerce/promotions";
import { itemsFromLines, toGa4Item, track } from "@/lib/analytics";

export interface CartLine {
  handle: string;
  variantId: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  promoCode: string | null;
}

type Action =
  | { type: "add"; handle: string; variantId: string; quantity: number }
  | { type: "set"; handle: string; quantity: number }
  | { type: "remove"; handle: string }
  | { type: "promo"; code: string | null }
  | { type: "clear" }
  | { type: "hydrate"; state: CartState };

const STORAGE_KEY = "waggle.cart.v1";
const MAX_QTY = 10;

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "add": {
      const existing = state.lines.find((l) => l.handle === action.handle);
      const lines = existing
        ? state.lines.map((l) => (l.handle === action.handle ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + action.quantity) } : l))
        : [...state.lines, { handle: action.handle, variantId: action.variantId, quantity: Math.min(MAX_QTY, action.quantity) }];
      return { ...state, lines };
    }
    case "set":
      return {
        ...state,
        lines: state.lines
          .map((l) => (l.handle === action.handle ? { ...l, quantity: Math.max(0, Math.min(MAX_QTY, action.quantity)) } : l))
          .filter((l) => l.quantity > 0),
      };
    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.handle !== action.handle) };
    case "promo":
      return { ...state, promoCode: action.code };
    case "clear":
      return { lines: [], promoCode: null };
    case "hydrate":
      return action.state;
  }
}

export interface PlanLine {
  product: Product;
  plan: SubscriptionPlan;
  quantity: number;
}

export interface CartTotals {
  subtotal: number;
  compareAtSavings: number;
  discount: number;
  shipping: number;
  total: number;
  itemCount: number;
  promotion?: Promotion;
  /** Plans the customer will need after purchase, one per device. */
  plans: PlanLine[];
  /** Lowest published yearly cost of required plans, where known. */
  requiredYearly: number;
  hasUnpricedRequiredPlan: boolean;
}

interface CartContextValue {
  lines: CartLine[];
  detailed: Array<CartLine & { product: Product }>;
  totals: CartTotals;
  promoCode: string | null;
  isOpen: boolean;
  lastAdded: string | null;
  open: () => void;
  close: () => void;
  add: (handle: string, quantity?: number, opts?: { silent?: boolean }) => void;
  addMany: (handles: string[]) => void;
  setQuantity: (handle: string, quantity: number) => void;
  remove: (handle: string) => void;
  applyPromo: (code: string) => { ok: boolean; message: string };
  clearPromo: () => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/** Expand a bundle into the devices whose plans it needs. */
function planDevices(p: Product): Product[] {
  if (p.kind !== "bundle") return [p];
  return (p.includes ?? []).map(getProduct).filter((x): x is Product => Boolean(x));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], promoCode: null });
  // Skip the first save so the empty initial state never overwrites the stored cart.
  const skipFirstSave = useRef(true);
  const [isOpen, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        const lines = (parsed.lines ?? []).filter((l) => getProduct(l.handle));
        dispatch({ type: "hydrate", state: { lines, promoCode: parsed.promoCode ?? null } });
      }
    } catch {
      /* storage unavailable: start empty */
    }
  }, []);

  useEffect(() => {
    if (skipFirstSave.current) {
      skipFirstSave.current = false;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const detailed = useMemo(
    () =>
      state.lines.flatMap((l) => {
        const product = getProduct(l.handle);
        return product ? [{ ...l, product }] : [];
      }),
    [state.lines],
  );

  const totals = useMemo<CartTotals>(() => {
    const subtotal = detailed.reduce((s, l) => s + priceOf(l.product) * l.quantity, 0);
    const compareAtSavings = detailed.reduce((s, l) => {
      const c = l.product.variants[0]?.price.compareAt;
      return s + (c ? (c - priceOf(l.product)) * l.quantity : 0);
    }, 0);
    const promotion = state.promoCode ? findPromotion(state.promoCode) : undefined;
    const hasDevice = detailed.some((l) => l.product.kind !== "accessory");
    const discount = promotion && hasDevice ? Math.round(subtotal * promotion.percentOff * 100) / 100 : 0;

    const planMap = new Map<string, PlanLine>();
    for (const l of detailed) {
      for (const d of planDevices(l.product)) {
        const plan = getPlan(d.planId);
        if (!plan) continue;
        const prev = planMap.get(d.handle);
        planMap.set(d.handle, { product: d, plan, quantity: (prev?.quantity ?? 0) + l.quantity });
      }
    }
    const plans = [...planMap.values()];
    const required = plans.filter((p) => p.plan.requirement === "required");
    const requiredYearly = required.reduce((s, p) => {
      const y = p.plan.options.find((o) => o.interval === "year");
      return s + (y ? y.price * p.quantity : 0);
    }, 0);

    return {
      subtotal,
      compareAtSavings,
      discount,
      shipping: 0,
      total: Math.max(0, subtotal - discount),
      itemCount: detailed.reduce((s, l) => s + l.quantity, 0),
      promotion: discount > 0 ? promotion : undefined,
      plans,
      requiredYearly,
      hasUnpricedRequiredPlan: required.some((p) => !p.plan.options.some((o) => o.interval === "year")),
    };
  }, [detailed, state.promoCode]);

  const add = useCallback((handle: string, quantity = 1, opts?: { silent?: boolean }) => {
    const product = getProduct(handle);
    const variant = product?.variants[0];
    if (!product || !variant?.available) return;
    dispatch({ type: "add", handle, variantId: variant.id, quantity });
    setLastAdded(handle);
    track("add_to_cart", { currency: "USD", value: priceOf(product) * quantity, items: [toGa4Item(product, quantity)] });
    if (!opts?.silent) setOpen(true);
  }, []);

  const addMany = useCallback(
    (handles: string[]) => {
      handles.forEach((h) => add(h, 1, { silent: true }));
      setOpen(true);
    },
    [add],
  );

  const setQuantity = useCallback(
    (handle: string, quantity: number) => {
      const line = state.lines.find((l) => l.handle === handle);
      const product = getProduct(handle);
      if (line && product && quantity !== line.quantity) {
        const delta = quantity - line.quantity;
        track(delta > 0 ? "add_to_cart" : "remove_from_cart", {
          currency: "USD",
          value: priceOf(product) * Math.abs(delta),
          items: [toGa4Item(product, Math.abs(delta))],
        });
      }
      dispatch({ type: "set", handle, quantity });
    },
    [state.lines],
  );

  const remove = useCallback(
    (handle: string) => {
      const line = state.lines.find((l) => l.handle === handle);
      const product = getProduct(handle);
      if (line && product) {
        track("remove_from_cart", { currency: "USD", value: priceOf(product) * line.quantity, items: [toGa4Item(product, line.quantity)] });
      }
      dispatch({ type: "remove", handle });
    },
    [state.lines],
  );

  const applyPromo = useCallback(
    (code: string) => {
      const promo = findPromotion(code);
      if (!promo) return { ok: false, message: "That code isn't valid." };
      dispatch({ type: "promo", code: promo.code });
      track("promotion_applied", { promotion_id: promo.code, promotion_name: promo.label, items: itemsFromLines(state.lines) });
      return { ok: true, message: `${promo.label} applied to hardware.` };
    },
    [state.lines],
  );

  const value: CartContextValue = {
    lines: state.lines,
    detailed,
    totals,
    promoCode: state.promoCode,
    isOpen,
    lastAdded,
    open: () => {
      setOpen(true);
      track("view_cart", { currency: "USD", value: totals.total, items: itemsFromLines(state.lines) });
    },
    close: () => setOpen(false),
    add,
    addMany,
    setQuantity,
    remove,
    applyPromo,
    clearPromo: () => dispatch({ type: "promo", code: null }),
    clear: () => dispatch({ type: "clear" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
