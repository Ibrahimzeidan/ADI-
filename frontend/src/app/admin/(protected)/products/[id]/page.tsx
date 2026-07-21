import { prisma } from "@/lib/db";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!product) notFound();
  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/products" className="text-sm text-stone-500 hover:text-stone-700">← Back to Products</Link>
        <h1 className="text-2xl font-bold text-stone-800 mt-2">Edit Product</h1>
      </div>
      <ProductForm categories={categories} initial={product} productId={product.id} />
    </div>
  );
}
