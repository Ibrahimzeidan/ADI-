import { prisma } from "@/lib/db";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

const stars = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    include: { user: { select: { fullName: true } }, product: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-stone-800 mb-6">Reviews ({reviews.length})</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>{["Customer", "Product", "Rating", "Comment", "Date", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {reviews.map((r) => (
                <tr key={r.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3 font-medium text-stone-800">{r.user.fullName || "—"}</td>
                  <td className="px-4 py-3 text-stone-500">{r.product?.name ?? <span className="italic text-stone-300">Store</span>}</td>
                  <td className="px-4 py-3 text-amber-500 tracking-tighter text-xs">{stars(r.rating)}</td>
                  <td className="px-4 py-3 text-stone-600 max-w-xs truncate">{r.comment}</td>
                  <td className="px-4 py-3 text-stone-400 text-xs">
                    {new Date(r.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3">
                    <DeleteButton url={`/api/admin/reviews/${r.id}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {reviews.length === 0 && <p className="text-center py-12 text-stone-400">No reviews yet.</p>}
        </div>
      </div>
    </div>
  );
}
