// Uploads a profile photo to Supabase Storage and returns the public URL.
// We store the URL in the Profile table, not the binary data — keeps the DB small.
// Supabase Storage bucket name: "avatars" (create this in your dashboard).

import type { SupabaseClient } from "@supabase/supabase-js";
import type { PrismaClient } from "@prisma/client";

export async function uploadProfilePhoto(
  supabase: SupabaseClient,
  prisma: PrismaClient,
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
  const photoUrl = data.publicUrl;

  await prisma.profile.update({ where: { id: userId }, data: { photoUrl } });

  return photoUrl;
}
