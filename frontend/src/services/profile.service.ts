import type { SupabaseClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/db";
import { findProfile, updateProfileData } from "@/repositories/profile.repository";

export const getProfile = (userId: string) => findProfile(prisma, userId);

export const updateProfile = (
  userId: string,
  data: { fullName?: string; phone?: string; address?: string; photoUrl?: string }
) => updateProfileData(prisma, userId, data);

export async function changePassword(
  supabase: SupabaseClient,
  email: string,
  currentPassword: string,
  newPassword: string
) {
  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  });
  if (verifyError) return { error: "Current password is incorrect" };

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { error: error.message };
  return { error: null };
}

export async function uploadProfilePhoto(
  supabase: SupabaseClient,
  userId: string,
  file: File
) {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${userId}/avatar.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);
  await updateProfileData(prisma, userId, { photoUrl: data.publicUrl });
  return data.publicUrl;
}
