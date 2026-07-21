"use client";

// Loads all favorite IDs once per session instead of once per FavoriteButton.
// Previously FavoriteButton called /api/favorites independently per card —
// 12 products on a page meant 12 identical API calls. This context fetches once.
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

interface FavCtx {
  favoriteIds: Set<string>;
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => Promise<void>;
}

const FavoritesContext = createContext<FavCtx | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [ids, setIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) { setIds(new Set()); return; }
    fetch("/api/favorites")
      .then((r) => r.json())
      .then((d) => { if (d.favoriteIds) setIds(new Set(d.favoriteIds)); })
      .catch(() => {});
  }, [user]);

  const toggle = useCallback(async (productId: string) => {
    const wasFav = ids.has(productId);
    // Optimistic update
    setIds((prev) => {
      const next = new Set(prev);
      wasFav ? next.delete(productId) : next.add(productId);
      return next;
    });
    try {
      if (wasFav) {
        await fetch(`/api/favorites?productId=${productId}`, { method: "DELETE" });
      } else {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId }),
        });
      }
    } catch {
      // Revert on network error
      setIds((prev) => {
        const next = new Set(prev);
        wasFav ? next.add(productId) : next.delete(productId);
        return next;
      });
    }
  }, [ids]);

  return (
    <FavoritesContext.Provider value={{ favoriteIds: ids, isFavorite: (id) => ids.has(id), toggle }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be inside FavoritesProvider");
  return ctx;
}
