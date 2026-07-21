"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import type { ProductWithCategory } from "@/lib/types";
import SearchBar from "./SearchBar";
import AlphabetFilter from "./AlphabetFilter";
import ProductGrid from "@/components/products/ProductGrid";
import Skeleton from "@/components/ui/Skeleton";

export default function SearchContent() {
  const t = useTranslations("search");
  const locale = useLocale();
  const router = useRouter();
  const params = useSearchParams();

  const initialQ      = params.get("q") ?? "";
  const initialLetter = params.get("letter") ?? "";

  const [results, setResults]       = useState<ProductWithCategory[]>([]);
  const [loading, setLoading]       = useState(false);
  const [hasSearched, setHasSearched] = useState(!!(initialQ || initialLetter));

  const runSearch = useCallback(async (q: string, letter: string) => {
    setHasSearched(true);
    setLoading(true);
    try {
      const url = letter
        ? `/api/search?letter=${letter}`
        : q ? `/api/search?q=${encodeURIComponent(q)}` : null;
      if (!url) { setResults([]); setLoading(false); return; }
      const res = await fetch(url);
      setResults(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialQ)      runSearch(initialQ, "");
    else if (initialLetter) runSearch("", initialLetter);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = useCallback((q: string) => {
    router.replace(q ? `/${locale}/search?q=${encodeURIComponent(q)}` : `/${locale}/search`, { scroll: false } as any);
    runSearch(q, "");
  }, [locale, router, runSearch]);

  const handleLetter = useCallback((letter: string) => {
    router.replace(letter ? `/${locale}/search?letter=${letter}` : `/${locale}/search`, { scroll: false } as any);
    runSearch("", letter);
  }, [locale, router, runSearch]);

  return (
    <div className="space-y-6">
      <SearchBar initialValue={initialQ} onSearch={handleSearch} placeholder={t("placeholder")} />
      <AlphabetFilter active={initialLetter} onSelect={handleLetter} />
      {loading && <Skeleton count={8} />}
      {!loading && hasSearched && (
        <ProductGrid products={results} emptyTitle={t("noResults")} emptyMessage={t("noResultsMessage")} />
      )}
      {!loading && !hasSearched && (
        <p className="text-center text-stone-400 py-16">{t("hint")}</p>
      )}
    </div>
  );
}
