"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ProductWithCategory } from "@/lib/types";
import AddToCartButton from "./AddToCartButton";
import FavoriteButton from "@/components/favorites/FavoriteButton";

export default function ProductCard({ product, rating }: { product: ProductWithCategory; rating?: { avg: number; count: number } }) {
  const locale = useLocale();
  const name = locale === "ar" && product.nameAr ? product.nameAr : product.name;

  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square bg-stone-50">
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={name} fill
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105" />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-stone-100 to-stone-200" />
          )}
          {/* Favorite button — top corner */}
          <div className="absolute top-2 end-2" onClick={(e) => e.preventDefault()}>
            <FavoriteButton productId={product.id} className="bg-white/80 backdrop-blur-sm shadow-sm" />
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <span className="text-xs font-medium text-brand-accent uppercase tracking-wide">
            {product.category.name}
          </span>
          <h3 className="mt-1 font-semibold text-brand-dark leading-snug line-clamp-2 group-hover:text-brand-primary transition-colors">
            {name}
          </h3>
          <p className="mt-1 text-brand-primary font-bold">${product.price.toFixed(2)}</p>
          {rating && rating.count > 0 && (
            <span className="mt-1 flex items-center gap-1 text-xs text-stone-500">
              <span className="text-amber-400">★</span>
              {rating.avg.toFixed(1)} <span className="text-stone-300">({rating.count})</span>
            </span>
          )}
        </div>
      </Link>
      <div className="px-3 pb-3 sm:px-4 sm:pb-4 mt-auto">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
