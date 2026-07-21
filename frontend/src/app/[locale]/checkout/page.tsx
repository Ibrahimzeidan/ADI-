// Checkout page — requires sign-in; redirects guests to home.
// Delegates the actual form to CheckoutForm (client component).

import { redirect } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export default async function CheckoutPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const locale = await getLocale();

  if (!data.user) redirect(`/${locale}`);

  const t = await getTranslations("checkout");

  return (
    <div className="min-h-screen bg-brand-light pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-serif text-3xl font-bold text-brand-dark mb-8">{t("title")}</h1>
        <CheckoutForm />
      </div>
    </div>
  );
}
