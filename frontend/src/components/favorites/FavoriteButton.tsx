"use client";

// Uses FavoritesContext so all buttons on a page share one API call instead of N calls.
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { usePathname } from "@/i18n/navigation";

interface Props { productId: string; className?: string; }

export default function FavoriteButton({ productId, className = "" }: Props) {
  const { user, openAuthModal } = useAuth();
  const { isFavorite, toggle } = useFavorites();
  const pathname = usePathname();
  const isFav = isFavorite(productId);

  const handleClick = async () => {
    if (!user) { openAuthModal(pathname); return; }
    await toggle(productId);
  };

  return (
    <button onClick={handleClick} aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      className={`p-1.5 rounded-full transition-colors ${isFav ? "text-red-500" : "text-stone-300 hover:text-red-400"} ${className}`}>
      <svg className="w-5 h-5" fill={isFav ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  );
}
