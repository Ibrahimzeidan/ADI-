"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { OfferItem } from "@/lib/types";
import OfferBadge from "./OfferBadge";
import AddOfferToCartButton from "./AddOfferToCartButton";

export default function OfferCard({ offer }: { offer: OfferItem }) {
  const locale = useLocale();
  const title = locale === "ar" && offer.titleAr ? offer.titleAr : offer.title;
  const description = locale === "ar" && offer.descriptionAr ? offer.descriptionAr : offer.description;

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
      <Link href={`/offers/${offer.id}`} className="block">
        <div className="relative aspect-video bg-brand-dark/30">
          {offer.imageUrl ? (
            <Image src={offer.imageUrl} alt={title} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 to-brand-secondary/20" />
          )}
          <div className="absolute top-3 start-3">
            <OfferBadge originalPrice={offer.originalPrice} offerPrice={offer.offerPrice} />
          </div>
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 className="font-serif font-bold text-white text-base leading-snug">{title}</h3>
          <p className="text-white/70 text-sm mt-1 line-clamp-2">{description}</p>
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-white/50 text-sm line-through">${offer.originalPrice.toFixed(2)}</span>
          <span className="text-brand-primary font-bold text-lg">${offer.offerPrice.toFixed(2)}</span>
        </div>
        <AddOfferToCartButton offer={offer} />
      </div>
    </div>
  );
}
