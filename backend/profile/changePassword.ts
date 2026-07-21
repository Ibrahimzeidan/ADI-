// Changes the user's password via Supabase Auth.
// The user must be signed in (session active). We verify the current password
// by re-signing-in before allowing the change — this prevents someone from
// changing the password on an unattended unlocked session.

import type { SupabaseClient } from "@supabase/supabase-js";

export async function changePassword(
  supabase: SupabaseClient,
  email: string,
  currentPassword: string,
  newPassword: string
) {
  // Verify current password by attempting sign-in
  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  });

  if (verifyError) {
    return { error: "Current password is incorrect" };
  }

  // Update to new password
  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) return { error: error.message };

  return { error: null };
}
