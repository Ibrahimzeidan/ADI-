import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-800">Products ({products.length})</h1>
        <Link href="/admin/products/new"
          className="bg-brand-primary text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-brand-primary/85">
          + Add Product
        </Link>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>{["Image", "Name", "Category", "Price", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100">
                      {p.imageUrl && <Image src={p.imageUrl} alt={p.name} width={40} height={40} className="object-cover" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-stone-800">{p.name}</td>
                  <td className="px-4 py-3 text-stone-500">{p.category.name}</td>
                  <td className="px-4 py-3 font-semibold text-brand-primary">${p.price.toFixed(2)}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <Link href={`/admin/products/${p.id}`}
                      className="text-xs text-blue-600 hover:underline px-2 py-1">Edit</Link>
                    <DeleteButton url={`/api/admin/products/${p.id}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
