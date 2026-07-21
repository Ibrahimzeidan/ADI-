// Minimal root layout — only sets <html lang dir> and loads fonts.
// Header, Footer, and i18n providers live in app/[locale]/layout.tsx so they
// have access to the locale context from the URL segment.

import type { Metadata } from "next";
import { Inter, Playfair_Display, Cairo } from "next/font/google";
import { getLocale } from "next-intl/server";
import ServiceWorkerRegistration from "@/components/layout/ServiceWorkerRegistration";
import "../styles/globals.css";

const inter    = Inter({ subsets: ["latin"],           variable: "--font-inter",   display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
// Cairo covers Arabic glyphs + Latin digits; latin subset keeps file size reasonable
const cairo    = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo",   display: "swap" });

export const metadata: Metadata = {
  title: "ADI Lebanon — Three Generations of Quality Since 1949",
  description: "ADI Lebanon is a family-owned group from Saida, Lebanon. Home of ADI convenience stores, Nutnow premium nuts, and Adisso café.",
  keywords: ["ADI Lebanon", "ADI convenience store", "Nutnow nuts", "Adisso café", "Saida Lebanon", "Lebanese grocery"],
  openGraph: {
    title: "ADI Lebanon — Three Generations of Quality",
    description: "Shop fresh groceries, premium nuts, and café products from a trusted family business in Lebanon since 1949.",
    type: "website",
    locale: "en_US",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // getLocale() reads the locale the middleware detected from the URL segment.
  // This lets us set lang + dir on <html> for correct browser behavior and screen readers.
  const locale = await getLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}
      className={`${inter.variable} ${playfair.variable} ${cairo.variable}`}>
      <body className="antialiased">
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
