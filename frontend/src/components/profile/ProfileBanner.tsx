"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface Props {
  fullName: string;
  email: string;
  photoUrl: string | null;
  favoritesCount: number;
}

export default function ProfileBanner({ fullName, email, photoUrl, favoritesCount }: Props) {
  const t = useTranslations("profile");
  const tNav = useTranslations("nav");
  const [photo, setPhoto] = useState(photoUrl);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    if (!file.type.startsWith("image/")) { setUploadError("Please select an image file."); return; }
    if (file.size > 5 * 1024 * 1024) { setUploadError("Image must be smaller than 5 MB."); return; }
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/profile/photo", { method: "POST", body: form });
    const data = await res.json();
    if (data.photoUrl) setPhoto(data.photoUrl);
    else setUploadError(data.error ?? "Upload failed. Please try again.");
    setUploading(false);
  };

  const initial = fullName[0]?.toUpperCase() ?? "U";

  return (
    <div className="rounded-2xl overflow-hidden bg-white/88 backdrop-blur-md shadow-lg border border-white/60">
      {/* Branded dark banner with logo watermark */}
      <div className="bg-brand-dark h-28 sm:h-36 relative overflow-hidden">
        <Image
          src="/images/adi-logo.png"
          alt=""
          fill
          className="object-contain opacity-[0.12] scale-150"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/25 via-transparent to-brand-secondary/10" />
      </div>

      <div className="px-5 pb-5">
        {/* Avatar row — overlaps the banner */}
        <div className="flex items-end gap-4 -mt-10 sm:-mt-12 mb-4 flex-wrap">
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white bg-brand-primary flex items-center justify-center shadow-md">
              {photo ? (
                <Image src={photo} alt={fullName} fill className="object-cover" sizes="96px" />
              ) : (
                <span className="text-white text-3xl sm:text-4xl font-bold select-none">{initial}</span>
              )}
            </div>
            <button
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              aria-label={t("uploadPhoto")}
              className="absolute -bottom-1 -end-1 w-7 h-7 bg-brand-primary text-white rounded-full text-xs flex items-center justify-center hover:bg-brand-primary/80 disabled:opacity-60 transition-colors shadow"
            >
              {uploading ? "…" : "✎"}
            </button>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </div>

          <div className="pb-1 min-w-0 flex-1">
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark truncate">{fullName}</h1>
            <p className="text-stone-500 text-sm truncate">{email}</p>
            <p className="text-xs text-stone-400 mt-0.5">{t("emailNote")}</p>
            {uploadError && <p className="text-xs text-red-500 mt-1">{uploadError}</p>}
          </div>
        </div>

        {/* Quick nav to Favorites + Orders */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/favorites"
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-stone-100 text-sm font-semibold text-stone-600 hover:border-brand-primary hover:text-brand-primary transition-colors"
          >
            <span className="text-brand-primary">♥</span>
            {tNav("favorites")}
            {favoritesCount > 0 && (
              <span className="bg-brand-primary text-white text-xs px-1.5 py-0.5 rounded-full leading-none">
                {favoritesCount}
              </span>
            )}
          </Link>
          <Link
            href="/orders"
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-stone-100 text-sm font-semibold text-stone-600 hover:border-brand-secondary hover:text-brand-secondary transition-colors"
          >
            <span className="text-brand-secondary">◎</span>
            {tNav("orders")}
          </Link>
        </div>
      </div>
    </div>
  );
}
