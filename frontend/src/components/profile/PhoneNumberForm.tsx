"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function PhoneNumberForm({ initialPhone }: { initialPhone: string }) {
  const t = useTranslations("profile");
  const [phone, setPhone] = useState(initialPhone);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white/88 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/60">
      <h3 className="font-semibold text-brand-dark mb-4">{t("phone")}</h3>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder={t("phonePlaceholder")}
        dir="ltr"
        className="w-full border border-stone-300 rounded-xl px-3 py-2.5 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
      />
      <button
        onClick={save}
        disabled={saving}
        className="bg-brand-primary text-white font-semibold rounded-xl px-5 py-2 text-sm hover:bg-brand-primary/85 disabled:opacity-50 transition-all"
      >
        {saved ? t("saved") : saving ? "…" : t("savePhone")}
      </button>
    </div>
  );
}
