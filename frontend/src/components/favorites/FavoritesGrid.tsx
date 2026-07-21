"use client";

// Grid of favorited products with an inline Remove button.
// Remove immediately re-fetches to keep the list in sync.

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ProductWithCategory } from "@/lib/types";

interface Props {
  products: ProductWithCategory[];
  emptyTitle: string;
  emptyMessage: string;
}

export default function FavoritesGrid({ products: initial, emptyTitle, emptyMessage }: Props) {
  const [products, setProducts] = useState(initial);
  const locale = useLocale();
  const t = useTranslations("favorites");

  const remove = async (productId: string) => {
    await fetch(`/api/favorites?productId=${productId}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl font-semibold text-stone-400 mb-2">{emptyTitle}</p>
        <p className="text-stone-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((p) => {
        const name = locale === "ar" && p.nameAr ? p.nameAr : p.name;
        return (
          <div key={p.id} className="flex flex-col rounded-2xl overflow-hidden bg-white/88 backdrop-blur-md border border-white/60 shadow-lg">
            <Link href={`/products/${p.slug}`}>
              <div className="relative aspect-square bg-stone-50">
                {p.imageUrl && <Image src={p.imageUrl} alt={name} fill className="object-cover" sizes="25vw" />}
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-brand-dark text-sm line-clamp-2">{name}</h3>
                <p className="text-brand-primary font-bold text-sm mt-1">${p.price.toFixed(2)}</p>
              </div>
            </Link>
            <div className="px-3 pb-3 mt-auto">
              <button onClick={() => remove(p.id)}
                className="w-full text-sm text-red-500 border border-red-200 rounded-xl py-2 hover:bg-red-50 transition-colors">
                {t("remove")}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
