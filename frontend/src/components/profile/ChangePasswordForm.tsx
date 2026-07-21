"use client";

// Change password form — current password + new password + confirm.
// Client validates that new passwords match before hitting the API.

import { useState } from "react";
import { useTranslations } from "next-intl";
import { validatePasswords } from "@/validators/auth.validator";

export default function ChangePasswordForm() {
  const t = useTranslations("profile");
  const tAuth = useTranslations("auth");
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validatePasswords(next, confirm);
    if (!v.valid) { setError(tAuth(v.error as any)); return; }
    setLoading(true); setError(null);
    const res = await fetch("/api/profile/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: current, newPassword: next }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) { setError(data.error); return; }
    setSuccess(true); setCurrent(""); setNext(""); setConfirm("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="bg-white/88 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/60">
      <h3 className="font-semibold text-brand-dark mb-4">{t("changePassword")}</h3>
      <form onSubmit={submit} className="space-y-3">
        {[{ label: t("currentPassword"), value: current, set: setCurrent },
          { label: t("newPassword"), value: next, set: setNext },
          { label: t("confirmNewPassword"), value: confirm, set: setConfirm }
        ].map(({ label, value, set }) => (
          <div key={label}>
            <label className="block text-sm text-stone-600 mb-1">{label}</label>
            <input type="password" required value={value} onChange={(e) => set(e.target.value)}
              className="w-full border border-stone-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40" />
          </div>
        ))}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{t("passwordUpdated")}</p>}
        <button type="submit" disabled={loading}
          className="bg-brand-primary text-white font-semibold rounded-xl px-5 py-2 text-sm hover:bg-brand-primary/85 disabled:opacity-50 transition-all">
          {loading ? "..." : t("changePassword")}
        </button>
      </form>
    </div>
  );
}
