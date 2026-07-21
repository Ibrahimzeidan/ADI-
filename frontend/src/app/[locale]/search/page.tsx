import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import SearchContent from "@/components/search/SearchContent";
import Skeleton from "@/components/ui/Skeleton";

export default async function SearchPage() {
  const t = await getTranslations("search");

  return (
    <div className="min-h-screen bg-brand-light pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">{t("title")}</h1>
          <p className="mt-1 text-stone-500">{t("subtitle")}</p>
        </div>
        {/* SearchContent uses useSearchParams() — must be inside Suspense in App Router */}
        <Suspense fallback={<Skeleton count={8} />}>
          <SearchContent />
        </Suspense>
      </div>
    </div>
  );
}
