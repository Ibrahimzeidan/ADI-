// Handles user sign-up using Supabase Auth.
// Supabase handles password hashing (bcrypt internally) — we never store
// plain-text passwords. After auth creation, we insert a Profile row
// with the same UUID so we can store fullName and address.

import type { SupabaseClient } from "@supabase/supabase-js";
import type { PrismaClient } from "@prisma/client";

export async function signUp(
  supabase: SupabaseClient,
  prisma: PrismaClient,
  fullName: string,
  email: string,
  password: string
) {
  // 1. Create the auth user — Supabase returns an error if email already exists
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    // Supabase returns "User already registered" for duplicate emails
    const isDuplicate =
      error.message.toLowerCase().includes("already") ||
      error.message.toLowerCase().includes("registered");
    return {
      user: null,
      error: isDuplicate ? "emailExists" : error.message, // "emailExists" is an i18n key
    };
  }

  if (!data.user) return { user: null, error: "Sign-up failed" };

  // 2. Create the profile row linked to the Supabase auth UUID
  await prisma.profile.create({
    data: { id: data.user.id, fullName },
  });

  return { user: data.user, error: null };
}
