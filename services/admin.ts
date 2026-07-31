import { createClient } from "@/lib/supabase/server";

export type EmployeeStatus =
  | "working"
  | "offline";

export interface Employee {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  role: string;

  status: EmployeeStatus;

  lastPunch: string | null;

  workedToday: string;
}

function formatWorked(ms: number) {
  const total = Math.floor(ms / 60000);

  const h = Math.floor(total / 60);

  const m = total % 60;

  return `${h}h ${m}m`;
}

export async function getEmployees(): Promise<Employee[]> {
  const supabase = await createClient();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .order("full_name");

  if (error) throw error;

  if (!profiles) return [];

  const employees: Employee[] = [];

  for (const profile of profiles) {
    const { data: punches, error: punchesError } =
      await supabase
        .from("punches")
        .select("*")
        .eq("user_id", profile.id)
        .order("created_at");

    if (punchesError) throw punchesError;

    let status: EmployeeStatus =
      "offline";

    let lastPunch: string | null =
      null;

    let total = 0;

    let start: Date | null = null;

    for (const punch of punches ?? []) {
      lastPunch = punch.created_at;

      switch (punch.event_type) {
        case "clock_in":
          status = "working";
          start = new Date(
            punch.created_at
          );
          break;

        case "clock_out":
          status = "offline";

          if (start) {
            total +=
              new Date(
                punch.created_at
              ).getTime() -
              start.getTime();
          }

          start = null;
          break;
      }
    }

    if (
      status === "working" &&
      start
    ) {
      total +=
        Date.now() -
        start.getTime();
    }

    employees.push({
      id: profile.id,
      full_name:
        profile.full_name,
      email: profile.email,
      avatar_url:
        profile.avatar_url,
      role: profile.role,
      status,
      lastPunch,
      workedToday:
        formatWorked(total),
    });
  }

  return employees;
}

export async function getEmployee(
  id: string
) {
  const supabase =
    await createClient();

  const {
    data: profile,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (profileError) {
    throw profileError;
  }

  const {
    data: punches,
    error: punchesError,
  } = await supabase
    .from("punches")
    .select("*")
    .eq("user_id", id)
    .order("created_at", {
      ascending: false,
    });

  if (punchesError) {
    throw punchesError;
  }

  return {
    profile,
    punches: punches ?? [],
  };
}