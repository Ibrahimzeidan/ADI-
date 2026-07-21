"use client";

// Admin-only sign-in page — completely separate from the customer auth flow.
// After sign-in, we verify role === "admin" server-side; regular customers are rejected.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    // Server will verify role === "admin" — if not admin, layout redirects back here
    const res = await fetch("/api/admin/me");
    if (!res.ok) {
      await supabase.auth.signOut();
      setError("Access denied — this account does not have admin privileges.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-stone-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="font-bold text-white text-2xl mb-1">ADI Admin</h1>
        <p className="text-stone-400 text-sm mb-6">Sign in to manage your store</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-stone-300 text-xs font-medium block mb-1">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-stone-700 text-white rounded-xl px-4 py-2.5 text-sm
                border border-stone-600 focus:outline-none focus:border-brand-primary" />
          </div>
          <div>
            <label className="text-stone-300 text-xs font-medium block mb-1">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-stone-700 text-white rounded-xl px-4 py-2.5 text-sm
                border border-stone-600 focus:outline-none focus:border-brand-primary" />
          </div>

          {error && <p className="text-red-400 text-sm bg-red-900/20 rounded-xl px-4 py-2">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-brand-primary text-white font-semibold rounded-xl py-3
              hover:bg-brand-primary/85 disabled:opacity-50 transition-all">
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
