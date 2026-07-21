"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/context/AuthContext";

// Shows a circular avatar with a dropdown when signed in, or a Sign In button when not.
export default function ProfileMenu() {
  const { user, openAuthModal, signOut } = useAuth();
  const tAuth = useTranslations("auth");
  const tNav = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when user clicks anywhere outside it
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) {
    return (
      <button
        onClick={() => openAuthModal()}
        className="text-sm font-semibold text-stone-300 hover:text-white transition-colors px-2 py-1"
      >
        {tAuth("signIn")}
      </button>
    );
  }

  // Show first letter of the user's full name, or "U" as fallback
  const initial = (user.user_metadata?.full_name as string)?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-8 h-8 rounded-full bg-brand-primary text-white text-sm font-bold flex items-center justify-center hover:bg-brand-primary/85 transition-colors"
        aria-label="Open profile menu"
      >
        {initial}
      </button>

      {open && (
        <div className="absolute top-10 end-0 w-44 bg-white rounded-xl shadow-lg border border-stone-100 py-1 z-50">
          <Link href="/profile" onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50">
            {tNav("profile")}
          </Link>
          <Link href="/orders" onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50">
            {tNav("orders")}
          </Link>
          <Link href="/favorites" onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50">
            {tNav("favorites")}
          </Link>
          <hr className="my-1 border-stone-100" />
          <button
            onClick={() => { setOpen(false); signOut(); }}
            className="w-full text-start px-4 py-2 text-sm text-red-500 hover:bg-red-50"
          >
            {tAuth("signOut")}
          </button>
        </div>
      )}
    </div>
  );
}
