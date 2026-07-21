"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ProductWithCategory } from "@/lib/types";
import AddToCartButton from "./AddToCartButton";
import FavoriteButton from "@/components/favorites/FavoriteButton";

export default function ProductDetail({ product, rating }: { product: ProductWithCategory; rating?: { avg: number; count: number } }) {
  const locale = useLocale();
  const t = useTranslations("product");

  const name        = locale === "ar" && product.nameAr        ? product.nameAr        : product.name;
  const description = locale === "ar" && product.descriptionAr ? product.descriptionAr : product.description;

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <Link
        href={`/categories/${product.category.slug}`}
        className="inline-flex items-center gap-1 text-sm text-brand-primary hover:underline mb-8"
      >
        ← {t("back", { category: product.category.name })}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-stone-100 shadow-md">
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={name} fill
              sizes="(max-width:768px) 100vw, 50vw" className="object-cover" priority />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-stone-100 to-stone-200" />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold text-brand-accent uppercase tracking-widest">
            {product.category.name}
          </span>
          <div className="flex items-start justify-between gap-2">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">{name}</h1>
            <FavoriteButton productId={product.id} />
          </div>
          <p className="text-2xl font-bold text-brand-primary">${product.price.toFixed(2)}</p>
          {rating && rating.count > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-stone-500">
              {[1,2,3,4,5].map((n) => (
                <span key={n} className={n <= Math.round(rating.avg) ? "text-amber-400" : "text-stone-200"}>★</span>
              ))}
              <span className="font-semibold text-stone-700">{rating.avg.toFixed(1)}</span>
              <span>({rating.count} reviews)</span>
            </div>
          )}
          <p className="text-stone-600 leading-relaxed">{description}</p>
          <AddToCartButton product={product} />
          <p className="text-xs text-stone-400">{t("priceNote")}</p>
        </div>
      </div>
    </section>
  );
}
