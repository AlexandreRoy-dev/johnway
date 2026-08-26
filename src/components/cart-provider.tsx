"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { getProduct, type Product } from "@/lib/products";

export type CartItem = {
  slug: string;
  quantity: number;
  days: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (slug: string, quantity?: number, days?: number) => void;
  updateItem: (slug: string, patch: Partial<CartItem>) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
  count: number;
  lines: { product: Product; quantity: number; days: number; lineTotal: number }[];
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "johnway-reservation";
const EMPTY = "[]";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("johnway-cart", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("johnway-cart", onStoreChange);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? EMPTY;
  } catch {
    return EMPTY;
  }
}

function getServerSnapshot() {
  return EMPTY;
}

function write(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("johnway-cart"));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const items = useMemo(() => {
    try {
      return JSON.parse(raw) as CartItem[];
    } catch {
      return [] as CartItem[];
    }
  }, [raw]);

  const addItem = useCallback(
    (slug: string, quantity = 1, days = 1) => {
      const existing = items.find((item) => item.slug === slug);
      if (existing) {
        write(
          items.map((item) =>
            item.slug === slug
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        );
        return;
      }
      write([...items, { slug, quantity, days }]);
    },
    [items],
  );

  const updateItem = useCallback(
    (slug: string, patch: Partial<CartItem>) => {
      write(items.map((item) => (item.slug === slug ? { ...item, ...patch } : item)));
    },
    [items],
  );

  const removeItem = useCallback(
    (slug: string) => {
      write(items.filter((item) => item.slug !== slug));
    },
    [items],
  );

  const clear = useCallback(() => write([]), []);

  const value = useMemo(() => {
    const lines = items
      .map((item) => {
        const product = getProduct(item.slug);
        if (!product) return null;
        return {
          product,
          quantity: item.quantity,
          days: item.days,
          lineTotal: product.pricePerDay * item.quantity * item.days,
        };
      })
      .filter((line): line is NonNullable<typeof line> => line !== null);

    return {
      items,
      addItem,
      updateItem,
      removeItem,
      clear,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      lines,
      total: lines.reduce((sum, line) => sum + line.lineTotal, 0),
    };
  }, [items, addItem, updateItem, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
