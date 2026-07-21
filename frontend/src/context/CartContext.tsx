"use client";

// Cart state is stored in localStorage so it survives page refreshes.
// We use useEffect to hydrate from localStorage (not direct read) to avoid a
// server/client HTML mismatch — server always renders an empty cart, then the
// client fills it in before the first paint.

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export interface CartItem {
  itemId: string;          // product.id for products, offer.id for offers
  type: "product" | "offer";
  slug: string;
  name: string;
  nameAr: string | null;
  price: number;
  quantity: number;
  imageUrl: string | null;
}

interface CartCtx {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("adi-cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Migrate old format (productId) to new format (itemId + type)
        const migrated = parsed.map((i: any) => ({
          ...i,
          itemId: i.itemId ?? i.productId,
          type: i.type ?? "product",
        }));
        setItems(migrated);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("adi-cart", JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.itemId === product.itemId);
      if (existing) return prev.map((i) => i.itemId === product.itemId ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((i) => i.itemId !== itemId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const updateQuantity = useCallback((itemId: string, qty: number) => {
    if (qty < 1) { removeItem(itemId); return; }
    setItems((prev) => prev.map((i) => i.itemId === itemId ? { ...i, quantity: qty } : i));
  }, [removeItem]);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
