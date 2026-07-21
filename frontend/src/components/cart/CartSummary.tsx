"use client";

import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/context/CartContext";

export default function CartSummary() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const { totalPrice, setIsOpen } = useCart();

  return (
    <div className="p-5 border-t border-stone-100 bg-stone-50 space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-medium text-stone-600">{t("total")}</span>
        <span className="text-xl font-bold text-brand-dark">${totalPrice.toFixed(2)}</span>
      </div>

      <a
        href={`/${locale}/checkout`}
        onClick={() => setIsOpen(false)}
        className="block w-full text-center bg-brand-primary text-white font-semibold rounded-xl py-3
          hover:bg-brand-primary/85 transition-colors"
      >
        {t("checkout")}
      </a>

      <button
        onClick={() => setIsOpen(false)}
        className="block w-full text-center text-sm text-stone-500 hover:text-brand-primary transition-colors"
      >
        {t("continueShopping")}
      </button>
    </div>
  );
}
