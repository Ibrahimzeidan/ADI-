"use client";

// Reusable delete button with a confirmation dialog.
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props { url: string; label?: string; onDeleted?: () => void; }

export default function DeleteButton({ url, label = "Delete", onDeleted }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!confirming) return (
    <button onClick={() => setConfirming(true)}
      className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
      {label}
    </button>
  );

  const handleDelete = async () => {
    setLoading(true);
    await fetch(url, { method: "DELETE" });
    if (onDeleted) onDeleted();
    else { router.refresh(); }
    setLoading(false);
    setConfirming(false);
  };

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-xs text-stone-500">Sure?</span>
      <button onClick={handleDelete} disabled={loading}
        className="text-xs text-red-600 font-semibold hover:underline disabled:opacity-50">
        {loading ? "…" : "Yes, delete"}
      </button>
      <button onClick={() => setConfirming(false)} className="text-xs text-stone-400 hover:underline">
        Cancel
      </button>
    </span>
  );
}
