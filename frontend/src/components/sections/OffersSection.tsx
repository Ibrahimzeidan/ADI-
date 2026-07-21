"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { OfferItem } from "@/lib/types";
import OfferCard from "@/components/offers/OfferCard";

export default function OffersSection({ offers }: { offers: OfferItem[] }) {
  const t = useTranslations("offers");
  if (offers.length === 0) return null;

  const featured = offers.slice(0, 3);

  return (
    <section className="py-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-primary mb-3">
            {t("badge")}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            {t("heading")}
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">{t("subheading")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        {offers.length > 0 && (
          <div className="text-center mt-10">
            <Link href="/offers"
              className="inline-flex items-center gap-2 border border-brand-primary text-brand-primary
                font-semibold rounded-xl px-6 py-3 hover:bg-brand-primary hover:text-white transition-all">
              {t("viewAll")}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
