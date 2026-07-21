"use client";

import { useEffect, useState } from "react";

const stars = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);

export default function ReviewsTab() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const load = () => fetch("/api/admin/reviews").then(r => r.json()).then(setReviews);
  useEffect(() => { load(); }, []);

  const del = async (id: string) => { await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" }); setConfirmDelete(null); load(); };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-stone-50 border-b border-stone-100">
          <tr>{["Customer","Product","Rating","Comment","Date","Action"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-stone-50">
          {reviews.map((r: any) => (
            <tr key={r.id} className="hover:bg-stone-50">
              <td className="px-4 py-3 font-medium text-stone-800">{r.user?.fullName ?? "—"}</td>
              <td className="px-4 py-3 text-stone-500">{r.product?.name ?? <span className="italic text-stone-300">Store</span>}</td>
              <td className="px-4 py-3 text-amber-500 tracking-tighter text-xs">{stars(r.rating)}</td>
              <td className="px-4 py-3 text-stone-600 max-w-xs truncate">{r.comment}</td>
              <td className="px-4 py-3 text-stone-400 text-xs">{new Date(r.createdAt).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</td>
              <td className="px-4 py-3">
                {confirmDelete === r.id
                  ? <><span className="text-xs text-stone-400">Sure? </span><button onClick={()=>del(r.id)} className="text-xs text-red-600 font-semibold hover:underline">Yes</button><button onClick={()=>setConfirmDelete(null)} className="text-xs text-stone-400 hover:underline ml-2">No</button></>
                  : <button onClick={()=>setConfirmDelete(r.id)} className="text-xs text-red-500 hover:underline">Delete</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {reviews.length === 0 && <p className="text-center py-12 text-stone-400">No reviews yet.</p>}
    </div>
  );
}
