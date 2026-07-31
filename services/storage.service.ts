import { supabase } from "@/lib/supabase/client";

export async function uploadAvatar(
  userId: string,
  file: File
) {
  const extension =
    file.name.split(".").pop();

  const path =
    `${userId}.${extension}`;

  const { error } =
    await supabase.storage
      .from("avatars")
      .upload(path, file, {
        upsert: true,
      });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("avatars")
    .getPublicUrl(path);

  return publicUrl;
}