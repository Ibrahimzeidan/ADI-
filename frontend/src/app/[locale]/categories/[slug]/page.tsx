import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCategoryBySlug } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";
import ProductListWithFilter from "@/components/products/ProductListWithFilter";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  return { title: category ? `${category.name} | ADI Lebanon` : "Category | ADI Lebanon" };
}

export default async function CategoryProductsPage({ params }: Props) {
  const { slug } = await params;
  const [category, products, t] = await Promise.all([
    getCategoryBySlug(slug).catch(() => null),
    getProductsByCategory(slug).catch(() => []),
    getTranslations("categories"),
  ]);

  if (!category) notFound();

  return (
    <div className="min-h-screen bg-brand-light pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-stone-500 mb-1">
            <Link href="/categories" className="hover:text-brand-primary transition-colors">
              {t("title")}
            </Link>
            {" / "}
            <span className="text-brand-dark font-medium">{category.name}</span>
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">{category.name}</h1>
          <p className="mt-1 text-stone-500">{products.length} product{products.length !== 1 ? "s" : ""}</p>
        </div>
        <ProductListWithFilter products={products} />
      </div>
    </div>
  );
}
