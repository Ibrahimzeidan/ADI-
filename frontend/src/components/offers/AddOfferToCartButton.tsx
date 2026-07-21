"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "@/i18n/navigation";
import type { OfferItem } from "@/lib/types";

export default function AddOfferToCartButton({ offer }: { offer: OfferItem }) {
  const t = useTranslations("offers");
  const tCart = useTranslations("cart");
  const { addItem, setIsOpen } = useCart();
  const { user, openAuthModal } = useAuth();
  const pathname = usePathname();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!user) { openAuthModal(pathname); return; }
    addItem({
      itemId: offer.id,
      type: "offer",
      slug: offer.id,
      name: offer.title,
      nameAr: offer.titleAr ?? null,
      price: offer.offerPrice,
      imageUrl: offer.imageUrl ?? null,
    });
    setAdded(true);
    setIsOpen(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button onClick={handleAdd}
      className="w-full bg-brand-primary text-white font-semibold rounded-xl py-2.5 px-4 text-sm
        hover:bg-brand-primary/85 active:scale-95 transition-all">
      {added ? `✓ ${tCart("added")}` : t("addToCart")}
    </button>
  );
}
