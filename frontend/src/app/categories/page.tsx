import Link from "next/link";
import { getAllCategories } from "@/lib/categories";
import CategoryGrid from "@/components/products/CategoryGrid";

// Page reads from the database — render per-request, not at build time.
export const dynamic = "force-dynamic";
export const metadata = { title: "Shop by Category | ADI Lebanon" };

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="min-h-screen bg-brand-light pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">Shop by Category</h1>
            <p className="mt-1 text-stone-500">Browse all {categories.length} product categories</p>
          </div>
          <Link
            href="/search"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-brand-primary
              text-brand-primary px-4 py-2 text-sm font-semibold hover:bg-brand-primary hover:text-white transition-colors"
          >
            🔍 Search products
          </Link>
        </div>

        <CategoryGrid categories={categories} />
      </div>
    </div>
  );
}
