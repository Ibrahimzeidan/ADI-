// Locale-specific layout — wraps every [locale]/* page with:
//   • NextIntlClientProvider  — gives client components access to translations
//   • AuthProvider            — current user + auth modal trigger
//   • CartProvider            — shared cart state across all pages
//   • Header + Footer         — site chrome
//   • CartDrawer              — slide-in cart panel
//   • AuthModal               — sign in/up modal (rendered once, shown on demand)

import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import AuthModal from "@/components/auth/AuthModal";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Load messages directly from the locale param — bypasses middleware locale detection
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AuthProvider>
        <FavoritesProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
            <AuthModal />
          </CartProvider>
        </FavoritesProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  );
}
