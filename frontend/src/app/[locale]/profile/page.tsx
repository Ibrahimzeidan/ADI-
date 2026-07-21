import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import ProfileBanner from "@/components/profile/ProfileBanner";
import PhoneNumberForm from "@/components/profile/PhoneNumberForm";
import ProfileAddressForm from "@/components/profile/ProfileAddressForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import MyReviews from "@/components/reviews/MyReviews";
import StoreReviewSection from "@/components/reviews/StoreReviewSection";
import { getTranslations } from "next-intl/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const locale = await getLocale();
  const t = await getTranslations("reviews");

  if (!data.user) redirect(`/${locale}`);

  const profile = await prisma.profile.findUnique({ where: { id: data.user.id } });
  if (!profile) redirect(`/${locale}`);

  const favCount = await prisma.favorite.count({ where: { userId: data.user.id } });

  return (
    <div className="min-h-screen pt-20 relative">
      {/* Fixed background — stays in place as cards scroll over it */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/images/ADI%20I.jpeg')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Gradient fade at bottom hides "Powered by Suppy" text */}
      <div
        className="fixed inset-x-0 bottom-0 h-40 -z-10"
        style={{ background: "linear-gradient(to bottom, transparent, #FFFDF9 80%)" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-5">
        <ProfileBanner
          fullName={profile.fullName}
          email={data.user.email!}
          photoUrl={profile.photoUrl}
          favoritesCount={favCount}
        />
        <PhoneNumberForm initialPhone={profile.phone ?? ""} />
        <ProfileAddressForm initialAddress={profile.address ?? ""} />
        <ChangePasswordForm />

        {/* Store review */}
        <div className="bg-white/88 backdrop-blur-md shadow-lg border border-white/60 rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-bold text-stone-800">{t("storeReview")}</h2>
          <p className="text-sm text-stone-500">{t("storeReviewNote")}</p>
          <StoreReviewSection />
        </div>

        {/* My reviews */}
        <div className="bg-white/88 backdrop-blur-md shadow-lg border border-white/60 rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-bold text-stone-800">{t("myReviews")}</h2>
          <MyReviews />
        </div>
      </div>
    </div>
  );
}
