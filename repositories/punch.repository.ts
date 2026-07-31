import { supabase } from "@/lib/supabase/client";

export async function findPunches(
  userId: string
) {
  const { data, error } = await supabase
    .from("punches")
    .select("*")
    .eq("user_id", userId)
    .order("created_at");

  if (error) throw error;

  return data ?? [];
}

export async function findLastPunch(
  userId: string
) {
  const { data, error } = await supabase
    .from("punches")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) throw error;

  return data;
}