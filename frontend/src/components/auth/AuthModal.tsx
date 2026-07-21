"use client";

// Full-screen modal with Sign In / Sign Up tabs.
// Opened by calling openAuthModal() from AuthContext — works from any component.

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthModal() {
  const t = useTranslations("auth");
  const { isAuthModalOpen, closeAuthModal } = useAuth();
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  // Reset to sign-in tab whenever the modal opens
  useEffect(() => {
    if (isAuthModalOpen) setTab("signin");
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeAuthModal} />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
        {/* Close */}
        <button onClick={closeAuthModal}
          className="absolute top-4 end-4 p-1 text-stone-400 hover:text-stone-700 transition-colors"
          aria-label="Close">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Tabs */}
        <div className="flex rounded-xl bg-stone-100 p-1 mb-6">
          {(["signin", "signup"] as const).map((t_) => (
            <button key={t_} onClick={() => setTab(t_)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === t_ ? "bg-white shadow text-brand-dark" : "text-stone-500"}`}>
              {t_ === "signin" ? t("signIn") : t("signUp")}
            </button>
          ))}
        </div>

        {tab === "signin"
          ? <SignInForm onSwitch={() => setTab("signup")} />
          : <SignUpForm onSwitch={() => setTab("signin")} />}
      </div>
    </div>
  );
}
