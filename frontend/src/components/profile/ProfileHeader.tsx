"use client";

// Profile photo, name, and email. Photo is uploadable via Supabase Storage.
// Email is read-only (Supabase Auth owns it; changing it requires re-verification).

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface Props {
  fullName: string;
  email: string;
  photoUrl: string | null;
}

export default function ProfileHeader({ fullName, email, photoUrl }: Props) {
  const t = useTranslations("profile");
  const [photo, setPhoto] = useState(photoUrl);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/profile/photo", { method: "POST", body: form });
    const data = await res.json();
    if (data.photoUrl) setPhoto(data.photoUrl);
    setUploading(false);
  };

  return (
    <div className="flex items-center gap-6">
      <div className="relative shrink-0">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-brand-primary flex items-center justify-center">
          {photo ? (
            <Image src={photo} alt={fullName} fill className="object-cover" />
          ) : (
            <span className="text-white text-3xl font-bold">{fullName[0]?.toUpperCase()}</span>
          )}
        </div>
        <button onClick={() => inputRef.current?.click()} disabled={uploading}
          className="absolute -bottom-1 -end-1 w-7 h-7 bg-white border-2 border-stone-200 rounded-full flex items-center justify-center hover:bg-stone-50 transition-colors">
          📷
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-brand-dark">{fullName}</h2>
        <p className="text-stone-500 text-sm">{email}</p>
        {/* Email is not editable — Supabase Auth would require re-verification to change it */}
        <p className="text-xs text-stone-400 mt-0.5">{t("emailNote")}</p>
      </div>
    </div>
  );
}
