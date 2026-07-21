"use client";

// Inline status dropdown — fires PATCH /api/admin/orders/:id/status on change.
const STATUSES = ["pending","confirmed","preparing","out_for_delivery","delivered","cancelled"];

export default function OrderStatusSelect({ orderId, current }: { orderId: string; current: string }) {
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    await fetch(`/api/admin/orders/${orderId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    // optimistic — status text updates via select's own value
  };

  const colors: Record<string, string> = {
    pending:          "text-amber-700 bg-amber-50",
    confirmed:        "text-blue-700 bg-blue-50",
    preparing:        "text-purple-700 bg-purple-50",
    out_for_delivery: "text-orange-700 bg-orange-50",
    delivered:        "text-green-700 bg-green-50",
    cancelled:        "text-stone-500 bg-stone-100",
  };

  return (
    <select defaultValue={current} onChange={handleChange}
      className={`text-xs font-semibold rounded-full px-3 py-1.5 border-0 cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-brand-primary ${colors[current] ?? "bg-stone-100"}`}>
      {STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
    </select>
  );
}
