import { createClient } from "@/lib/supabase/server";
import * as profileService from "@/services/profile.service";
import { ok, err } from "@/utils/response";

export async function handleGetProfile() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return err("Unauthorized", 401);
  const profile = await profileService.getProfile(data.user.id);
  return ok({ ...profile, email: data.user.email });
}

export async function handleUpdateProfile(request: Request) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return err("Unauthorized", 401);
  const body = await request.json();
  const profile = await profileService.updateProfile(data.user.id, body);
  return ok(profile);
}

export async function handleChangePassword(request: Request) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return err("Unauthorized", 401);
  const { currentPassword, newPassword } = await request.json();
  const result = await profileService.changePassword(
    supabase,
    data.user.email!,
    currentPassword,
    newPassword
  );
  if (result.error) return err(result.error);
  return ok({ ok: true });
}

export async function handleUploadPhoto(request: Request) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return err("Unauthorized", 401);
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) return err("No file provided");
  try {
    const photoUrl = await profileService.uploadProfilePhoto(supabase, data.user.id, file);
    return ok({ photoUrl });
  } catch (e: any) {
    return err(e.message, 500);
  }
}
