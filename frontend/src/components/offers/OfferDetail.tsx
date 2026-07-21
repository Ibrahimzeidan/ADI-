"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { OfferItem } from "@/lib/types";
import OfferBadge from "./OfferBadge";
import AddOfferToCartButton from "./AddOfferToCartButton";

export default function OfferDetail({ offer }: { offer: OfferItem }) {
  const locale = useLocale();
  const t = useTranslations("offers");

  const title = locale === "ar" && offer.titleAr ? offer.titleAr : offer.title;
  const description = locale === "ar" && offer.descriptionAr ? offer.descriptionAr : offer.description;

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/offers"
        className="inline-flex items-center gap-1 text-sm text-brand-primary hover:underline mb-8">
        {t("backToOffers")}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="relative aspect-video rounded-3xl overflow-hidden bg-brand-dark/30 shadow-md">
          {offer.imageUrl ? (
            <Image src={offer.imageUrl} alt={title} fill
              sizes="(max-width:768px) 100vw, 50vw" className="object-cover" priority />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 to-brand-secondary/20" />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <OfferBadge originalPrice={offer.originalPrice} offerPrice={offer.offerPrice} />
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">{title}</h1>
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-lg line-through">${offer.originalPrice.toFixed(2)}</span>
            <span className="text-2xl font-bold text-brand-primary">${offer.offerPrice.toFixed(2)}</span>
          </div>
          <p className="text-white/70 leading-relaxed">{description}</p>
          <AddOfferToCartButton offer={offer} />
        </div>
      </div>
    </section>
  );
}
