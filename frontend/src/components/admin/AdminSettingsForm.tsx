"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminSettingsForm({ currentEmail }: { currentEmail: string }) {
  const supabase = createClient();
  const [email, setEmail] = useState(currentEmail);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password !== confirm) { setMsg({ ok: false, text: "Passwords do not match." }); return; }
    setSaving(true); setMsg(null);
    const updates: { email?: string; password?: string } = {};
    if (email !== currentEmail) updates.email = email;
    if (password) updates.password = password;
    if (!Object.keys(updates).length) { setSaving(false); setMsg({ ok: false, text: "No changes to save." }); return; }
    const { error } = await supabase.auth.updateUser(updates);
    setSaving(false);
    if (error) setMsg({ ok: false, text: error.message });
    else setMsg({ ok: true, text: "Saved. If you changed your email, check your inbox to confirm." });
    setPassword(""); setConfirm("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 space-y-5">
      <div>
        <label className="text-xs font-semibold text-stone-500 block mb-1">Email</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40" />
      </div>
      <div>
        <label className="text-xs font-semibold text-stone-500 block mb-1">New Password <span className="text-stone-300">(leave blank to keep current)</span></label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40" />
      </div>
      <div>
        <label className="text-xs font-semibold text-stone-500 block mb-1">Confirm New Password</label>
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
          className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40" />
      </div>
      {msg && (
        <p className={`text-sm rounded-xl px-4 py-2 ${msg.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {msg.text}
        </p>
      )}
      <button type="submit" disabled={saving}
        className="bg-brand-primary text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-brand-primary/85 disabled:opacity-50">
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
}
