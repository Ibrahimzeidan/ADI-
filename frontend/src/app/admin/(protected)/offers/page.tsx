import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminOffersPage() {
  const offers = await prisma.offer.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-800">Offers ({offers.length})</h1>
        <Link href="/admin/offers/new"
          className="bg-brand-primary text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-brand-primary/85">
          + Add Offer
        </Link>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>{["Image", "Title", "Original", "Offer Price", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {offers.map((o) => {
                const discount = Math.round(((o.originalPrice - o.offerPrice) / o.originalPrice) * 100);
                return (
                  <tr key={o.id} className="hover:bg-stone-50">
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100">
                        {o.imageUrl && <Image src={o.imageUrl} alt={o.title} width={40} height={40} className="object-cover" />}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-stone-800">{o.title}</td>
                    <td className="px-4 py-3 text-stone-400 line-through">${o.originalPrice.toFixed(2)}</td>
                    <td className="px-4 py-3 font-semibold text-brand-primary">
                      ${o.offerPrice.toFixed(2)}
                      <span className="ml-1 text-xs text-emerald-600">-{discount}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold rounded-full px-2.5 py-1 ${o.isActive ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-400"}`}>
                        {o.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <Link href={`/admin/offers/${o.id}`}
                        className="text-xs text-blue-600 hover:underline px-2 py-1">Edit</Link>
                      <DeleteButton url={`/api/admin/offers/${o.id}`} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {offers.length === 0 && <p className="text-center py-12 text-stone-400">No offers yet.</p>}
        </div>
      </div>
    </div>
  );
}
