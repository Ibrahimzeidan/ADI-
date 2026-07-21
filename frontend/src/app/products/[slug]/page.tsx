import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import ProductDetail from "@/components/products/ProductDetail";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.name} | ADI Lebanon` : "Product | ADI Lebanon" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-brand-light pt-24">
      <ProductDetail product={product} />
    </div>
  );
}
