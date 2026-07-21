"use client";

// Sign-up form — fullName, email, password, confirmPassword.
// Validates password match client-side before hitting the server.
// Shows a specific error for duplicate emails.

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { validatePasswords } from "@/validators/auth.validator";

interface Props {
  onSwitch: () => void;
}

export default function SignUpForm({ onSwitch }: Props) {
  const t = useTranslations("auth");
  const { closeAuthModal, redirectPath } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validatePasswords(password, confirm);
    if (!validation.valid) { setError(t(validation.error as any)); return; }
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password }),
    });
    const json = await res.json();
    setLoading(false);
    if (json.error) { setError(t(json.error as any) ?? json.error); return; }
    // Sign in immediately after sign-up, then do a soft refresh (no full reload)
    const supabase = createClient();
    await supabase.auth.signInWithPassword({ email, password });
    closeAuthModal();
    router.refresh();
    if (redirectPath && redirectPath !== window.location.pathname) router.push(redirectPath);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">{t("fullName")}</label>
        <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)}
          className="w-full border border-stone-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40" />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">{t("email")}</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-stone-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40" />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">{t("password")}</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-stone-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40" />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">{t("confirmPassword")}</label>
        <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)}
          className="w-full border border-stone-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading}
        className="w-full bg-brand-primary text-white font-semibold rounded-xl py-2.5 hover:bg-brand-primary/85 disabled:opacity-50 transition-all">
        {loading ? "..." : t("signUp")}
      </button>
      <button type="button" onClick={onSwitch} className="w-full text-sm text-stone-500 hover:text-brand-primary transition-colors">
        {t("hasAccount")}
      </button>
    </form>
  );
}
