import { redirect } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { getFavorites } from "@/services/favorite.service";
import FavoritesGrid from "@/components/favorites/FavoritesGrid";
import PageBrandedHeader from "@/components/shared/PageBrandedHeader";

export default async function FavoritesPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const locale = await getLocale();

  if (!data.user) redirect(`/${locale}`);

  const [favorites, t] = await Promise.all([
    getFavorites(data.user.id),
    getTranslations("favorites"),
  ]);

  const products = favorites.map((f: { product: any }) => f.product);

  return (
    <div className="min-h-screen pt-20 relative">
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/images/ADI%20I.jpeg')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="fixed inset-x-0 bottom-0 h-40 -z-10"
        style={{ background: "linear-gradient(to bottom, transparent, #FFFDF9 80%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <PageBrandedHeader
          title={t("title")}
          subtitle={t("subtitle", { count: products.length })}
        />
        <FavoritesGrid
          products={products}
          emptyTitle={t("empty")}
          emptyMessage={t("emptyMessage")}
        />
      </div>
    </div>
  );
}
