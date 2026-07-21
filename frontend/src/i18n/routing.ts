import { defineRouting } from "next-intl/routing";

// Arabic is the default locale — ADI's real customers are Arabic-speaking in Lebanon.
// Both locales are always prefixed in the URL: /ar/... and /en/...
export const routing = defineRouting({
  locales: ["en", "ar"] as const,
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
