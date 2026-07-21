"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_LINKS } from "@/lib/constants";

export default function NavLinks({ className = "" }: { className?: string }) {
  const t = useTranslations("nav");

  return (
    <nav className={`flex items-center gap-6 ${className}`} aria-label="Main navigation">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.key}
          href={link.href}
          className="text-sm font-medium text-stone-300 hover:text-brand-secondary transition-colors duration-200"
        >
          {t(link.key)}
        </Link>
      ))}
    </nav>
  );
}
