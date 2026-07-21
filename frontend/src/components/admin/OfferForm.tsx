"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  initial?: Record<string, any>;
  offerId?: string;
}

export default function OfferForm({ initial = {}, offerId }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initial.title ?? "",
    titleAr: initial.titleAr ?? "",
    description: initial.description ?? "",
    descriptionAr: initial.descriptionAr ?? "",
    imageUrl: initial.imageUrl ?? "",
    originalPrice: initial.originalPrice ?? "",
    offerPrice: initial.offerPrice ?? "",
    isActive: initial.isActive ?? true,
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError(null);
    const url = offerId ? `/api/admin/offers/${offerId}` : "/api/admin/offers";
    const method = offerId ? "PATCH" : "POST";
    const res = await fetch(url, {
      method, headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        originalPrice: parseFloat(form.originalPrice as string),
        offerPrice: parseFloat(form.offerPrice as string),
      }),
    });
    setSaving(false);
    if (!res.ok) { setError("Failed to save offer"); return; }
    router.push("/admin/offers");
    router.refresh();
  };

  const textFields = [
    { key: "title", label: "Title (EN)", required: true },
    { key: "titleAr", label: "Title (AR)" },
    { key: "originalPrice", label: "Original Price ($)", type: "number", required: true },
    { key: "offerPrice", label: "Offer Price ($)", type: "number", required: true },
    { key: "imageUrl", label: "Image URL" },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 space-y-4 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {textFields.map(({ key, label, required, type }) => (
          <div key={key}>
            <label className="text-xs font-semibold text-stone-500 block mb-1">{label}</label>
            <input required={required} type={type ?? "text"} step={type === "number" ? "0.01" : undefined}
              value={(form as any)[key]} onChange={set(key)}
              className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40" />
          </div>
        ))}
        <div className="flex items-center gap-2 pt-5">
          <input type="checkbox" id="isActive" checked={form.isActive as boolean}
            onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
            className="rounded text-brand-primary" />
          <label htmlFor="isActive" className="text-sm font-medium text-stone-700">Active (visible to customers)</label>
        </div>
      </div>
      {[["description", "Description (EN)"], ["descriptionAr", "Description (AR)"]].map(([k, l]) => (
        <div key={k}>
          <label className="text-xs font-semibold text-stone-500 block mb-1">{l}</label>
          <textarea rows={2} value={(form as any)[k]} onChange={set(k)}
            className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/40" />
        </div>
      ))}
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={saving}
          className="bg-brand-primary text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-brand-primary/85 disabled:opacity-50">
          {saving ? "Saving…" : (offerId ? "Update Offer" : "Create Offer")}
        </button>
        <button type="button" onClick={() => router.push("/admin/offers")}
          className="border border-stone-200 text-stone-600 rounded-xl px-5 py-2 text-sm hover:bg-stone-50">
          Cancel
        </button>
      </div>
    </form>
  );
}
