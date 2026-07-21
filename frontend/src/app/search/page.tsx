import { Suspense } from "react";
import SearchContent from "@/components/search/SearchContent";
import Skeleton from "@/components/ui/Skeleton";

export const metadata = { title: "Search Products | ADI Lebanon" };

// SearchContent uses useSearchParams(), which requires a Suspense boundary in App Router.
export default function SearchPage() {
  return (
    <div className="min-h-screen bg-brand-light pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">Search Products</h1>
          <p className="mt-1 text-stone-500">Find products by name or browse A–Z</p>
        </div>
        <Suspense fallback={<Skeleton count={8} />}>
          <SearchContent />
        </Suspense>
      </div>
    </div>
  );
}
