"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import type { ProductWithCategory } from "@/lib/types";
import ProductGrid from "./ProductGrid";

export default function ProductListWithFilter({ products }: { products: ProductWithCategory[] }) {
  const t = useTranslations("categories");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return products;
    const lower = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        (p.nameAr ?? "").includes(query)
    );
  }, [products, query]);

  return (
    <div>
      <div className="mb-6">
        <input
          type="search"
          placeholder={t("filterPlaceholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-sm rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm
            text-brand-dark placeholder:text-stone-400 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
        />
      </div>
      <ProductGrid products={filtered} />
    </div>
  );
}
