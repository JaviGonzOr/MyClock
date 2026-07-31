import { createClient } from "@/lib/supabase/server";

export interface LiveEmployee {
  id: string;
  full_name: string;
  avatar_url: string | null;
  working: boolean;
  lastPunch: string;
}

export async function getLiveEmployees(): Promise<LiveEmployee[]> {
  const supabase = await createClient();

  const [{ data: employees, error: employeeError }, { data: punches, error: punchError }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("id,full_name,avatar_url"),

      supabase
        .from("punches")
        .select("user_id,event_type,created_at")
        .order("created_at", { ascending: false }),
    ]);

  if (employeeError) throw employeeError;
  if (punchError) throw punchError;

  const latestPunch = new Map<
    string,
    {
      event_type: string;
      created_at: string;
    }
  >();

  for (const punch of punches ?? []) {
    if (!latestPunch.has(punch.user_id)) {
      latestPunch.set(punch.user_id, {
        event_type: punch.event_type,
        created_at: punch.created_at,
      });
    }
  }

  return (employees ?? []).map((employee) => {
    const last = latestPunch.get(employee.id);

    return {
      id: employee.id,
      full_name: employee.full_name,
      avatar_url: employee.avatar_url,
      working:
        last?.event_type === "clock_in" ||
        last?.event_type === "break_end",
      lastPunch: last?.created_at ?? "",
    };
  });
}