"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { COMPANY, NAV_LINKS, LOCATIONS } from "@/lib/constants";
import FooterColumn from "./FooterColumn";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <Image src="/images/adi-logo.png" alt="ADI Lebanon logo" width={100} height={33}
                className="h-8 w-auto object-contain" />
              <span className="font-serif text-xl font-bold text-brand-secondary group-hover:text-brand-secondary/80 transition-colors">
                ADI Lebanon
              </span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-xs">{t("tagline")}</p>
          </div>

          <FooterColumn title={t("quickLinks")}
            links={NAV_LINKS.map((l) => ({ label: tNav(l.key), href: l.href }))} />

          <FooterColumn title={t("contactTitle")}>
            <p>{COMPANY.phone}</p>
            <p>{COMPANY.email}</p>
            <p>{COMPANY.hours}</p>
          </FooterColumn>

          <FooterColumn title={t("locationsTitle")}>
            {LOCATIONS.map((loc) => <p key={loc.id}>{loc.address}</p>)}
          </FooterColumn>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-stone-500">© {year} ADI Lebanon. {t("rights")}</p>
          <div className="flex gap-5">
            <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer"
              className="text-xs text-stone-500 hover:text-brand-secondary transition-colors">Instagram</a>
            <a href={COMPANY.facebook} target="_blank" rel="noopener noreferrer"
              className="text-xs text-stone-500 hover:text-brand-secondary transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
