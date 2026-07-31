import { createClient } from "@/lib/supabase/server";
import { Employee } from "@/types/employee";
import { Punch } from "@/types/punch";

export async function getEmployee(id: string): Promise<Employee | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data as Employee | null;
}

export async function getEmployeePunches(userId: string): Promise<Punch[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("punches")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  console.log("========== EMPLOYEE HISTORY ==========");
  console.log("USER ID:", userId);
  console.log("PUNCHES:", data);
  console.log("ERROR:", error);
  console.log("======================================");

  if (error) throw error;

  return (data ?? []) as Punch[];
}
