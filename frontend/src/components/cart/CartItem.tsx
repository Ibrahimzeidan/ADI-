"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useCart, type CartItem as CartItemType } from "@/context/CartContext";

export default function CartItem({ item }: { item: CartItemType }) {
  const t = useTranslations("cart");
  const locale = useLocale();
  const { removeItem, updateQuantity } = useCart();

  const name = locale === "ar" && item.nameAr ? item.nameAr : item.name;

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0">
        {item.imageUrl && (
          <Image src={item.imageUrl} alt={name} fill sizes="64px" className="object-cover" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-brand-dark truncate">{name}</p>
        <p className="text-sm text-brand-primary font-bold">${item.price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <button onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
            className="w-6 h-6 rounded-full bg-stone-100 text-stone-600 hover:bg-brand-primary hover:text-white text-sm font-bold transition-colors">
            −
          </button>
          <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
          <button onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
            className="w-6 h-6 rounded-full bg-stone-100 text-stone-600 hover:bg-brand-primary hover:text-white text-sm font-bold transition-colors">
            +
          </button>
        </div>
      </div>

      <button onClick={() => removeItem(item.itemId)}
        className="text-xs text-stone-400 hover:text-red-500 transition-colors shrink-0 ps-1">
        {t("remove")}
      </button>
    </div>
  );
}
