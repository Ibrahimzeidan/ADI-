"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import StoreRatingBadge from "@/components/reviews/StoreRatingBadge";

export default function HeroSection({ storeRating }: { storeRating?: { avg: number; count: number } }) {
  const t = useTranslations("hero");

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-linear-to-br from-brand-dark via-brand-dark to-[#2C0E00]" />
      <div className="absolute top-1/4 inset-e-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 inset-s-0 w-80 h-80 bg-brand-primary/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-brand-secondary text-sm font-semibold uppercase tracking-[0.25em] mb-5">
          {t("badge")}
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          {t("heading1")}
          <span className="block text-brand-primary mt-1">{t("heading2")}</span>
        </h1>
        <p className="text-stone-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {t("mission")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button label={t("cta1")} href="#about" variant="primary" />
          <Button label={t("cta2")} href="#brands" variant="ghost" />
        </div>
        {storeRating && storeRating.count > 0 && (
          <div className="mt-6">
            <StoreRatingBadge avg={storeRating.avg} count={storeRating.count} />
          </div>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/40" aria-hidden>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
