"use client";

// Reused for both creating and editing a product.
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Category } from "@prisma/client";

interface Props {
  categories: Category[];
  initial?: Record<string, any>;
  productId?: string;
}

export default function ProductForm({ categories, initial = {}, productId }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: initial.name ?? "", nameAr: initial.nameAr ?? "",
    description: initial.description ?? "", descriptionAr: initial.descriptionAr ?? "",
    price: initial.price ?? "", slug: initial.slug ?? "",
    imageUrl: initial.imageUrl ?? "", categoryId: initial.categoryId ?? "",
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError(null);
    const url = productId ? `/api/admin/products/${productId}` : "/api/admin/products";
    const method = productId ? "PATCH" : "POST";
    const res = await fetch(url, {
      method, headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: parseFloat(form.price as string) }),
    });
    setSaving(false);
    if (!res.ok) { setError("Failed to save product"); return; }
    router.push("/admin/products");
    router.refresh();
  };

  const fields = [
    { key: "name", label: "Name (EN)", required: true },
    { key: "nameAr", label: "Name (AR)" },
    { key: "slug", label: "Slug", required: true },
    { key: "price", label: "Price ($)", type: "number", required: true },
    { key: "imageUrl", label: "Image URL" },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 space-y-4 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ key, label, required, type }) => (
          <div key={key}>
            <label className="text-xs font-semibold text-stone-500 block mb-1">{label}</label>
            <input required={required} type={type ?? "text"} step={type === "number" ? "0.01" : undefined}
              value={(form as any)[key]} onChange={set(key)}
              className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40" />
          </div>
        ))}
        <div>
          <label className="text-xs font-semibold text-stone-500 block mb-1">Category</label>
          <select required value={form.categoryId} onChange={set("categoryId")}
            className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40">
            <option value="">— select —</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
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
          {saving ? "Saving…" : (productId ? "Update Product" : "Create Product")}
        </button>
        <button type="button" onClick={() => router.push("/admin/products")}
          className="border border-stone-200 text-stone-600 rounded-xl px-5 py-2 text-sm hover:bg-stone-50">
          Cancel
        </button>
      </div>
    </form>
  );
}
