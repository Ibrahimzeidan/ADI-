import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { getProductRating } from "@/services/review.service";
import ProductDetail from "@/components/products/ProductDetail";
import ProductReviewSection from "@/components/reviews/ProductReviewSection";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.name} | ADI Lebanon` : "Product | ADI Lebanon" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);

  if (!product) notFound();

  const rating = await getProductRating(product.id).catch(() => undefined);

  return (
    <div className="min-h-screen bg-brand-light pt-24">
      <ProductDetail product={product} rating={rating} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <ProductReviewSection productId={product.id} />
      </div>
    </div>
  );
}
