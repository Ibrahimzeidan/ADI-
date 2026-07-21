import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Redirect all non-locale URLs to the default locale (/en/...).
// Admin routes are excluded — they live at /admin/* with no locale prefix.
export default createMiddleware(routing);

export const config = {
  // Exclude: api, admin, Next.js internals, and any path with a dot (static files)
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)" ],
};
