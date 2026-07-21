// proxy.ts — Next.js 16 middleware (renamed from middleware.ts).
// Runs two things on every request:
// 1. Supabase session refresh — keeps auth cookies alive between requests
// 2. next-intl i18n routing — adds /ar or /en prefix and detects locale

import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

const handleI18n = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  // Start with the i18n response (may be a redirect for locale prefix)
  const response = handleI18n(request);

  // Skip Supabase session refresh if env vars aren't configured yet
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return response;
  }

  // Refresh Supabase session — copies updated auth cookies onto the response
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // getUser() triggers a token refresh if the access token is expiring
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
