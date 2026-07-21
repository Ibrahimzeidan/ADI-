"use client";

// Editable delivery address — saved to the Profile table and pre-filled on checkout.

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ProfileAddressForm({ initialAddress }: { initialAddress: string }) {
  const t = useTranslations("profile");
  const [address, setAddress] = useState(initialAddress ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true); setSaved(false);
    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white/88 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/60">
      <h3 className="font-semibold text-brand-dark mb-4">{t("deliveryAddress")}</h3>
      <textarea rows={3} value={address} onChange={(e) => setAddress(e.target.value)}
        placeholder={t("addressPlaceholder")}
        className="w-full border border-stone-300 rounded-xl px-3 py-2.5 text-sm resize-none mb-3 focus:outline-none focus:ring-2 focus:ring-brand-primary/40" />
      <button onClick={save} disabled={saving}
        className="bg-brand-primary text-white font-semibold rounded-xl px-5 py-2 text-sm hover:bg-brand-primary/85 disabled:opacity-50 transition-all">
        {saved ? t("saved") : saving ? "..." : t("saveAddress")}
      </button>
    </div>
  );
}
