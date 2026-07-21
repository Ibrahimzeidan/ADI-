import { redirect } from "next/navigation";

// The real homepage lives at /[locale]. The middleware redirects "/" automatically,
// but this fallback catches any direct hits that bypass middleware.
export default function RootPage() {
  redirect("/en"); // matches defaultLocale in routing.ts
}
