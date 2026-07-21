"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/admin/Modal";

const blank = { name: "", slug: "" };

export default function CategoriesTab() {
  const [categories, setCategories] = useState<any[]>([]);
  const [modal, setModal] = useState<{ open: boolean; cat?: any }>({ open: false });
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const load = () => fetch("/api/admin/categories").then(r => r.json()).then(setCategories);
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(blank); setModal({ open: true }); };
  const openEdit = (c: any) => { setForm({ name: c.name, slug: c.slug }); setModal({ open: true, cat: c }); };

  const save = async () => {
    setSaving(true);
    const url = modal.cat ? `/api/admin/categories/${modal.cat.id}` : "/api/admin/categories";
    await fetch(url, { method: modal.cat ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false); setModal({ open: false }); load();
  };

  const del = async (id: string) => { await fetch(`/api/admin/categories/${id}`, { method: "DELETE" }); setConfirmDelete(null); load(); };
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={openCreate} className="bg-brand-primary text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-brand-primary/85">+ Add Category</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-100"><tr>{["Name","Slug","Products","Actions"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-stone-50">
            {categories.map((c: any) => (
              <tr key={c.id} className="hover:bg-stone-50">
                <td className="px-4 py-3 font-medium text-stone-800">{c.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-stone-400">{c.slug}</td>
                <td className="px-4 py-3"><span className="bg-stone-100 text-stone-700 text-xs font-semibold rounded-full px-2 py-0.5">{c._count?.products ?? 0}</span></td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <button onClick={() => openEdit(c)} className="text-xs text-blue-600 hover:underline px-2 py-1">Edit</button>
                  {confirmDelete === c.id
                    ? <><span className="text-xs text-stone-400">Sure?</span><button onClick={() => del(c.id)} className="text-xs text-red-600 font-semibold hover:underline">Yes</button><button onClick={() => setConfirmDelete(null)} className="text-xs text-stone-400 hover:underline">No</button></>
                    : <button onClick={() => setConfirmDelete(c.id)} className="text-xs text-red-500 hover:underline px-2 py-1">Delete</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && <p className="text-center py-12 text-stone-400">No categories yet.</p>}
      </div>
      {modal.open && (
        <Modal title={modal.cat ? "Edit Category" : "Add Category"} onClose={() => setModal({ open: false })}>
          <div className="space-y-3">
            {[["name","Name",true],["slug","Slug",true]].map(([k,l,req]: any) => (
              <div key={k}><label className="text-xs font-semibold text-stone-500 block mb-1">{l}</label>
                <input required={req} value={(form as any)[k]} onChange={set(k)} className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40"/>
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button onClick={save} disabled={saving} className="bg-brand-primary text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-brand-primary/85 disabled:opacity-50">{saving ? "Saving…" : modal.cat ? "Update" : "Create"}</button>
              <button onClick={() => setModal({ open: false })} className="border border-stone-200 text-stone-600 rounded-xl px-5 py-2 text-sm hover:bg-stone-50">Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
