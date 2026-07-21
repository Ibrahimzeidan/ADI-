"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@/components/admin/Modal";

const blank = { name:"", nameAr:"", slug:"", price:"", imageUrl:"", categoryId:"", description:"", descriptionAr:"" };

export default function ProductsTab() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [modal, setModal] = useState<{ open: boolean; product?: any }>({ open: false });
  const [form, setForm] = useState<any>(blank);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const load = () => Promise.all([fetch("/api/admin/products").then(r=>r.json()), fetch("/api/admin/categories").then(r=>r.json())]).then(([p,c])=>{ setProducts(p); setCategories(c); });
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(blank); setModal({ open: true }); };
  const openEdit = (p: any) => { setForm({ ...p, price: String(p.price) }); setModal({ open: true, product: p }); };

  const save = async () => {
    setSaving(true);
    const url = modal.product ? `/api/admin/products/${modal.product.id}` : "/api/admin/products";
    await fetch(url, { method: modal.product ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, price: parseFloat(form.price) }) });
    setSaving(false); setModal({ open: false }); load();
  };

  const del = async (id: string) => { await fetch(`/api/admin/products/${id}`, { method: "DELETE" }); setConfirmDelete(null); load(); };

  const set = (k: string) => (e: any) => setForm((f: any) => ({ ...f, [k]: e.target.value }));

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={openCreate} className="bg-brand-primary text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-brand-primary/85">+ Add Product</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-100"><tr>{["","Name","Category","Price","Actions"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-stone-50">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-stone-50">
                <td className="px-4 py-3"><div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100">{p.imageUrl&&<Image src={p.imageUrl} alt={p.name} width={40} height={40} className="object-cover"/>}</div></td>
                <td className="px-4 py-3 font-medium text-stone-800">{p.name}</td>
                <td className="px-4 py-3 text-stone-500">{p.category?.name}</td>
                <td className="px-4 py-3 font-semibold text-brand-primary">${p.price?.toFixed(2)}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <button onClick={()=>openEdit(p)} className="text-xs text-blue-600 hover:underline px-2 py-1">Edit</button>
                  {confirmDelete===p.id ? <><span className="text-xs text-stone-400">Sure?</span><button onClick={()=>del(p.id)} className="text-xs text-red-600 font-semibold hover:underline">Yes</button><button onClick={()=>setConfirmDelete(null)} className="text-xs text-stone-400 hover:underline">No</button></> : <button onClick={()=>setConfirmDelete(p.id)} className="text-xs text-red-500 hover:underline px-2 py-1">Delete</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length===0&&<p className="text-center py-12 text-stone-400">No products yet.</p>}
      </div>
      {modal.open && (
        <Modal title={modal.product?"Edit Product":"Add Product"} onClose={()=>setModal({open:false})}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[["name","Name (EN)",true],["nameAr","Name (AR)"],["slug","Slug",true],["price","Price ($)",false,"number"],["imageUrl","Image URL"]].map(([k,l,req,type]:any)=>(
                <div key={k}><label className="text-xs font-semibold text-stone-500 block mb-1">{l}</label><input required={req} type={type??"text"} step={type==="number"?"0.01":undefined} value={form[k]??""} onChange={set(k)} className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40"/></div>
              ))}
              <div><label className="text-xs font-semibold text-stone-500 block mb-1">Category</label>
                <select required value={form.categoryId} onChange={set("categoryId")} className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40">
                  <option value="">— select —</option>{categories.map((c:any)=><option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            {[["description","Description (EN)"],["descriptionAr","Description (AR)"]].map(([k,l])=>(
              <div key={k}><label className="text-xs font-semibold text-stone-500 block mb-1">{l}</label><textarea rows={2} value={form[k]??""} onChange={set(k)} className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/40"/></div>
            ))}
            <div className="flex gap-3 pt-2">
              <button onClick={save} disabled={saving} className="bg-brand-primary text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-brand-primary/85 disabled:opacity-50">{saving?"Saving…":modal.product?"Update":"Create"}</button>
              <button onClick={()=>setModal({open:false})} className="border border-stone-200 text-stone-600 rounded-xl px-5 py-2 text-sm hover:bg-stone-50">Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
