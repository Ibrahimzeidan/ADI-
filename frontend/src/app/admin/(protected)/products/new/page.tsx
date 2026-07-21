import { prisma } from "@/lib/db";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/products" className="text-sm text-stone-500 hover:text-stone-700">← Back to Products</Link>
        <h1 className="text-2xl font-bold text-stone-800 mt-2">Add New Product</h1>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
}
