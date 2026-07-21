"use client";

// Sign-in form — email + password.
// On success, closes the modal and redirects to the original page.

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";

interface Props {
  onSwitch: () => void;
}

export default function SignInForm({ onSwitch }: Props) {
  const t = useTranslations("auth");
  const { closeAuthModal, redirectPath } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      // Map common Supabase auth errors to friendly messages
      const msg = err.message.includes("Invalid login") || err.message.includes("credentials")
        ? t("invalidCredentials" as any)
        : err.message;
      setError(msg);
      return;
    }
    closeAuthModal();
    // router.refresh re-reads server session without a full page reload
    router.refresh();
    if (redirectPath && redirectPath !== window.location.pathname) router.push(redirectPath);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading}
        className="w-full bg-brand-primary text-white font-semibold rounded-xl py-2.5 hover:bg-brand-primary/85 disabled:opacity-50 transition-all">
        {loading ? "..." : t("signIn")}
      </button>
      <button type="button" onClick={onSwitch} className="w-full text-sm text-stone-500 hover:text-brand-primary transition-colors">
        {t("noAccount")}
      </button>
    </form>
  );
}
