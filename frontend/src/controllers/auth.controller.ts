import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import * as authService from "@/services/auth.service";
import { ok, err } from "@/utils/response";

export async function handleSignUp(request: Request) {
  try {
    const { fullName, email, password } = await request.json();
    if (!fullName || !email || !password) return err("Missing fields");

    const adminSupabase = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { user, error } = await authService.signUp(adminSupabase, fullName, email, password);
    if (error) return err(error);
    return ok({ userId: user!.id });
  } catch (e: any) {
    return err(e.message, 500);
  }
}

export async function handleSignOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return ok({ ok: true });
}
