"use client";

import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const next = locale === "ar" ? "en" : "ar";
  const label = locale === "ar" ? "EN" : "AR";

  const handleSwitch = () => {
    // Replace the locale segment in the current URL: /en/... → /ar/...
    const newPath = window.location.pathname.replace(`/${locale}`, `/${next}`);
    window.location.href = newPath;
  };

  return (
    <button
      onClick={handleSwitch}
      aria-label="Switch language"
      className="text-sm font-bold text-stone-400 hover:text-white transition-colors tracking-wide"
    >
      {label}
    </button>
  );
}
