"use client";

import { useTranslations } from "next-intl";
import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export default function CartDrawer() {
  const t = useTranslations("cart");
  const { items, isOpen, setIsOpen } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Dimmed backdrop — closes drawer on click */}
      <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

      {/* Slide-in panel — anchored to the end (right in LTR, left in RTL) */}
      <div className="fixed top-0 end-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-100">
          <h2 className="font-serif text-xl font-bold text-brand-dark">{t("title")}</h2>
          <button onClick={() => setIsOpen(false)}
            className="p-1 text-stone-400 hover:text-stone-700 transition-colors" aria-label="Close cart">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Item list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="text-5xl mb-4">🛒</div>
              <p className="font-semibold text-brand-dark mb-1">{t("empty")}</p>
              <p className="text-sm text-stone-500">{t("emptyMessage")}</p>
            </div>
          ) : (
            items.map((item) => <CartItem key={item.itemId} item={item} />)
          )}
        </div>

        {items.length > 0 && <CartSummary />}
      </div>
    </>
  );
}
