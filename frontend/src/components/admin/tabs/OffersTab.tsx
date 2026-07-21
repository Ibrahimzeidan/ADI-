"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@/components/admin/Modal";

const blank = { title:"", titleAr:"", description:"", descriptionAr:"", imageUrl:"", originalPrice:"", offerPrice:"", isActive:true };

export default function OffersTab() {
  const [offers, setOffers] = useState<any[]>([]);
  const [modal, setModal] = useState<{ open: boolean; offer?: any }>({ open: false });
  const [form, setForm] = useState<any>(blank);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const load = () => fetch("/api/admin/offers").then(r => r.json()).then(setOffers);
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(blank); setModal({ open: true }); };
  const openEdit = (o: any) => { setForm({ ...o, originalPrice: String(o.originalPrice), offerPrice: String(o.offerPrice) }); setModal({ open: true, offer: o }); };

  const save = async () => {
    setSaving(true);
    const url = modal.offer ? `/api/admin/offers/${modal.offer.id}` : "/api/admin/offers";
    await fetch(url, { method: modal.offer?"PATCH":"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({...form, originalPrice:parseFloat(form.originalPrice), offerPrice:parseFloat(form.offerPrice)}) });
    setSaving(false); setModal({open:false}); load();
  };

  const del = async (id: string) => { await fetch(`/api/admin/offers/${id}`, {method:"DELETE"}); setConfirmDelete(null); load(); };
  const set = (k: string) => (e: any) => setForm((f: any) => ({...f, [k]: e.target.type==="checkbox" ? e.target.checked : e.target.value}));

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={openCreate} className="bg-brand-primary text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-brand-primary/85">+ Add Offer</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-100"><tr>{["","Title","Original","Price","Status","Actions"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-stone-50">
            {offers.map(o => {
              const disc = Math.round(((o.originalPrice - o.offerPrice) / o.originalPrice) * 100);
              return (
                <tr key={o.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3"><div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100">{o.imageUrl&&<Image src={o.imageUrl} alt={o.title} width={40} height={40} className="object-cover"/>}</div></td>
                  <td className="px-4 py-3 font-medium text-stone-800">{o.title}</td>
                  <td className="px-4 py-3 text-stone-400 line-through">${o.originalPrice?.toFixed(2)}</td>
                  <td className="px-4 py-3 font-semibold text-brand-primary">${o.offerPrice?.toFixed(2)} <span className="text-xs text-emerald-600">-{disc}%</span></td>
                  <td className="px-4 py-3"><span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${o.isActive?"bg-emerald-50 text-emerald-700":"bg-stone-100 text-stone-400"}`}>{o.isActive?"Active":"Inactive"}</span></td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <button onClick={()=>openEdit(o)} className="text-xs text-blue-600 hover:underline px-2 py-1">Edit</button>
                    {confirmDelete===o.id ? <><span className="text-xs text-stone-400">Sure?</span><button onClick={()=>del(o.id)} className="text-xs text-red-600 font-semibold hover:underline">Yes</button><button onClick={()=>setConfirmDelete(null)} className="text-xs text-stone-400 hover:underline">No</button></> : <button onClick={()=>setConfirmDelete(o.id)} className="text-xs text-red-500 hover:underline px-2 py-1">Delete</button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {offers.length===0&&<p className="text-center py-12 text-stone-400">No offers yet.</p>}
      </div>
      {modal.open && (
        <Modal title={modal.offer?"Edit Offer":"Add Offer"} onClose={()=>setModal({open:false})}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[["title","Title (EN)",true],["titleAr","Title (AR)"],["originalPrice","Original Price",true,"number"],["offerPrice","Offer Price",true,"number"],["imageUrl","Image URL"]].map(([k,l,req,type]:any)=>(
                <div key={k}><label className="text-xs font-semibold text-stone-500 block mb-1">{l}</label><input required={req} type={type??"text"} step={type==="number"?"0.01":undefined} value={form[k]??""} onChange={set(k)} className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40"/></div>
              ))}
              <div className="flex items-center gap-2 pt-5"><input type="checkbox" id="isActive" checked={form.isActive} onChange={set("isActive")} className="rounded"/><label htmlFor="isActive" className="text-sm text-stone-700">Active</label></div>
            </div>
            {[["description","Description (EN)"],["descriptionAr","Description (AR)"]].map(([k,l])=>(
              <div key={k}><label className="text-xs font-semibold text-stone-500 block mb-1">{l}</label><textarea rows={2} value={form[k]??""} onChange={set(k)} className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/40"/></div>
            ))}
            <div className="flex gap-3 pt-2">
              <button onClick={save} disabled={saving} className="bg-brand-primary text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-brand-primary/85 disabled:opacity-50">{saving?"Saving…":modal.offer?"Update":"Create"}</button>
              <button onClick={()=>setModal({open:false})} className="border border-stone-200 text-stone-600 rounded-xl px-5 py-2 text-sm hover:bg-stone-50">Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
