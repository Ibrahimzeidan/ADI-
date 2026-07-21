import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

// next-intl plugin wires up server components so getTranslations() works
// without passing the locale as a prop through every layer.
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Allow placeholder images from picsum.photos during development.
      { protocol: "https", hostname: "picsum.photos" },
      // Supabase Storage for profile photos
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default withNextIntl(nextConfig);
