import { createClient } from "@/lib/supabase/server";

export interface DashboardMetrics {
  employees: number;
  working: number;
  schedules: number;
  punchesToday: number;
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const supabase = await createClient();

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const [
    employees,
    punches,
    schedules,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("id", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("punches")
      .select(
        "id,event_type,created_at,user_id"
      )
      .gte(
        "created_at",
        start.toISOString()
      )
      .order("created_at", {
        ascending: false,
      }),

    supabase
      .from("schedules")
      .select("id", {
        count: "exact",
        head: true,
      }),
  ]);

  if (employees.error) {
    throw employees.error;
  }

  if (punches.error) {
    throw punches.error;
  }

  if (schedules.error) {
    throw schedules.error;
  }

  // Último evento de cada empleado
  const latestPunch = new Map<
    string,
    string
  >();

  for (const punch of punches.data ?? []) {
    if (!latestPunch.has(punch.user_id)) {
      latestPunch.set(
        punch.user_id,
        punch.event_type
      );
    }
  }

  const workingUsers =
    new Set<string>();

  for (const [
    userId,
    event,
  ] of latestPunch) {
    switch (event) {
      case "clock_in":
      case "break_end":
        workingUsers.add(userId);
        break;

      case "break_start":
      case "clock_out":
      default:
        break;
    }
  }

  return {
    employees:
      employees.count ?? 0,

    working:
      workingUsers.size,

    schedules:
      schedules.count ?? 0,

    punchesToday:
      punches.data?.length ?? 0,
  };
}