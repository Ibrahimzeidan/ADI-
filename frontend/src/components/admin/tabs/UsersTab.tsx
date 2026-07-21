"use client";

import { useEffect, useState } from "react";

export default function UsersTab() {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => { fetch("/api/admin/users").then(r => r.json()).then(setUsers); }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-stone-50 border-b border-stone-100">
          <tr>{["Name","Phone","Orders","Joined"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-stone-50">
          {users.map((u: any) => (
            <tr key={u.id} className="hover:bg-stone-50">
              <td className="px-4 py-3 font-medium text-stone-800">{u.fullName || "—"}</td>
              <td className="px-4 py-3 text-stone-500">{u.phone || "—"}</td>
              <td className="px-4 py-3"><span className="bg-stone-100 text-stone-700 text-xs font-semibold rounded-full px-2 py-0.5">{u._count?.orders ?? 0}</span></td>
              <td className="px-4 py-3 text-stone-400 text-xs">{new Date(u.createdAt).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && <p className="text-center py-12 text-stone-400">No customers yet.</p>}
    </div>
  );
}
