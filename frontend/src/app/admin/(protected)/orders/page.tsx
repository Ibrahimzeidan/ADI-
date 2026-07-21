import { getAllOrders } from "@/services/admin.service";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-stone-800 mb-6">Orders ({orders.length})</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>{["ID", "Customer", "Items", "Total", "Status", "Date"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3 font-mono text-xs text-stone-400">{o.id.slice(-8)}</td>
                  <td className="px-4 py-3 font-medium text-stone-700">{o.user.fullName}</td>
                  <td className="px-4 py-3 text-stone-500 max-w-xs truncate">
                    {o.items.map((i) => i.product?.name ?? i.offer?.title ?? "—").join(", ")}
                  </td>
                  <td className="px-4 py-3 font-semibold text-brand-primary">${o.totalPrice.toFixed(2)}</td>
                  <td className="px-4 py-3"><OrderStatusSelect orderId={o.id} current={o.status} /></td>
                  <td className="px-4 py-3 text-stone-400 text-xs">
                    {new Date(o.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && <p className="text-center py-12 text-stone-400">No orders yet.</p>}
        </div>
      </div>
    </div>
  );
}
