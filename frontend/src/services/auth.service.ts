import type { SupabaseClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/db";
import { createProfile } from "@/repositories/auth.repository";

export async function signUp(
  supabase: SupabaseClient,
  fullName: string,
  email: string,
  password: string
) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("already") || msg.includes("registered"))
      return { user: null, error: "emailExists" };
    if (msg.includes("rate limit") || msg.includes("over_email") || msg.includes("security purposes"))
      return { user: null, error: "emailRateLimit" };
    return { user: null, error: error.message };
  }

  if (!data.user) return { user: null, error: "Sign-up failed" };

  await createProfile(prisma, data.user.id, fullName);
  return { user: data.user, error: null };
}
