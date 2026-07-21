"use client";

// Requires the user to be signed in before adding to cart.
// Guests see the auth modal instead — after signing in, they can click again.

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "@/i18n/navigation";
import type { ProductWithCategory } from "@/lib/types";

export default function AddToCartButton({ product }: { product: ProductWithCategory }) {
  const t = useTranslations("cart");
  const { addItem, setIsOpen } = useCart();
  const { user, openAuthModal } = useAuth();
  const pathname = usePathname();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!user) { openAuthModal(pathname); return; }
    addItem({
      itemId: product.id,
      type: "product",
      slug: product.slug,
      name: product.name,
      nameAr: product.nameAr ?? null,
      price: product.price,
      imageUrl: product.imageUrl ?? null,
    });
    setAdded(true);
    setIsOpen(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button onClick={handleAdd}
      className="w-full bg-brand-primary text-white font-semibold rounded-xl py-2.5 px-4 text-sm
        hover:bg-brand-primary/85 active:scale-95 transition-all">
      {added ? `✓ ${t("added")}` : t("addToCart")}
    </button>
  );
}
