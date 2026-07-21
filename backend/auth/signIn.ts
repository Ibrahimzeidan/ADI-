// Signs in an existing user via Supabase Auth.
// Supabase verifies the password hash — we never touch the password directly.
// On success, Supabase sets session cookies via the SSR client.

import type { SupabaseClient } from "@supabase/supabase-js";

export async function signIn(
  supabase: SupabaseClient,
  email: string,
  password: string
) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { user: null, error: "invalidCredentials" }; // i18n key
  }

  return { user: data.user, error: null };
}
