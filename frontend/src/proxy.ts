import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Redirect all non-locale URLs to the default locale (/en/...).
// Admin routes are excluded — they live at /admin/* with no locale prefix.
export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/(en|ar)/:path*",
    // Match all paths except Next internals, static files, and /admin routes
    "/((?!api|admin|_next|_vercel|\\.(?:ico|png|jpg|jpeg|svg|webp|woff2?|css|js)).*)",
  ],
};
