import { redirect } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { getUserOrders } from "@/services/order.service";
import ProfileOrders from "@/components/profile/ProfileOrders";
import PageBrandedHeader from "@/components/shared/PageBrandedHeader";

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const locale = await getLocale();

  if (!data.user) redirect(`/${locale}`);

  const [orders, t] = await Promise.all([
    getUserOrders(data.user.id).catch(() => []),
    getTranslations("profile"),
  ]);

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

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <PageBrandedHeader title={t("orderHistory")} />
        <ProfileOrders orders={orders as any} />
      </div>
    </div>
  );
}
