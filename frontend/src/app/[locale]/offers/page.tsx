import { getTranslations } from "next-intl/server";
import { getActiveOffers } from "@/services/offer.service";
import PageBrandedHeader from "@/components/shared/PageBrandedHeader";
import OfferCard from "@/components/offers/OfferCard";

export default async function OffersPage() {
  const [offers, t] = await Promise.all([
    getActiveOffers(),
    getTranslations("offers"),
  ]);

  return (
    <div className="min-h-screen pt-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-8 rounded-full bg-brand-primary shrink-0" />
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">{t("allOffers")}</h1>
          </div>
          <p className="text-white/50 text-sm ps-4">{t("subtitle", { count: offers.length })}</p>
        </div>

        {offers.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-semibold text-white/40 mb-2">{t("empty")}</p>
            <p className="text-white/30">{t("emptyMessage")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
