import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await prisma.profile.findMany({
    where: { role: "customer" },
    include: { _count: { select: { orders: true } } },
    orderBy: { createdAt: "desc" },
  });


  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-stone-800 mb-6">Customers ({users.length})</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>{["Name", "Phone", "Orders", "Joined"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3 font-medium text-stone-800">{u.fullName || "—"}</td>
                  <td className="px-4 py-3 text-stone-500">{u.phone || "—"}</td>
                  <td className="px-4 py-3">
                    <span className="bg-stone-100 text-stone-700 text-xs font-semibold rounded-full px-2 py-0.5">
                      {u._count.orders}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone-400 text-xs">
                    {new Date(u.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p className="text-center py-12 text-stone-400">No customers yet.</p>}
        </div>
      </div>
    </div>
  );
}
