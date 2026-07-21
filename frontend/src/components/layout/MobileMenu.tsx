"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_LINKS } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations("nav");

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-brand-dark border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
      <nav className="flex flex-col px-6 py-5 gap-4" aria-label="Mobile navigation">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            onClick={onClose}
            className="text-base font-medium text-stone-300 hover:text-brand-secondary transition-colors py-1"
          >
            {t(link.key)}
          </Link>
        ))}
        <div className="pt-3 border-t border-white/10">
          <Link
            href="#contact"
            onClick={onClose}
            className="block w-full text-center bg-brand-primary text-white font-semibold rounded-xl py-2.5 hover:bg-brand-primary/85 transition-colors"
          >
            {t("contactUs")}
          </Link>
        </div>
      </nav>
    </div>
  );
}
