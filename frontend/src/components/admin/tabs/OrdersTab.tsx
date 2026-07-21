"use client";

import { useEffect, useState } from "react";

const STATUSES = ["pending","confirmed","preparing","out_for_delivery","delivered","cancelled"];
const colors: Record<string,string> = { pending:"text-amber-700 bg-amber-50", confirmed:"text-blue-700 bg-blue-50", preparing:"text-purple-700 bg-purple-50", out_for_delivery:"text-orange-700 bg-orange-50", delivered:"text-green-700 bg-green-50", cancelled:"text-stone-500 bg-stone-100" };

export default function OrdersTab() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => { fetch("/api/admin/orders").then(r => r.json()).then(setOrders); }, []);

  const changeStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/orders/${id}/status`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-stone-50 border-b border-stone-100">
          <tr>{["ID","Customer","Items","Total","Status","Date"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-stone-50">
          {orders.map(o => (
            <tr key={o.id} className="hover:bg-stone-50">
              <td className="px-4 py-3 font-mono text-xs text-stone-400">{o.id.slice(-8)}</td>
              <td className="px-4 py-3 font-medium text-stone-700">{o.user?.fullName ?? "—"}</td>
              <td className="px-4 py-3 text-stone-500 max-w-xs truncate">{o.items?.map((i: any) => i.product?.name ?? i.offer?.title ?? "—").join(", ")}</td>
              <td className="px-4 py-3 font-semibold text-brand-primary">${o.totalPrice?.toFixed(2)}</td>
              <td className="px-4 py-3">
                <select defaultValue={o.status} onChange={e => changeStatus(o.id, e.target.value)}
                  className={`text-xs font-semibold rounded-full px-3 py-1 border-0 cursor-pointer focus:outline-none ${colors[o.status] ?? "bg-stone-100"}`}>
                  {STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g," ")}</option>)}
                </select>
              </td>
              <td className="px-4 py-3 text-stone-400 text-xs">{new Date(o.createdAt).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && <p className="text-center py-12 text-stone-400">No orders yet.</p>}
    </div>
  );
}
