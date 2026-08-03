import { createClient } from "@/lib/supabase/server";

import { calculateWorkedTime } from "./time";
import { Punch } from "@/types/punch";

export interface EmployeeStats {
  workedToday: string;
  workedMonth: string;
  punchesToday: number;
  lastPunch: string;
}

export async function getEmployeeStats(
  userId: string
): Promise<EmployeeStats> {
  const supabase = await createClient();

  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  // Últimos 30 días (igual que Informes)
  const start = new Date();
  start.setDate(start.getDate() - 30);

  const { data, error } = await supabase
    .from("punches")
    .select("*")
    .eq("user_id", userId)
    .gte("created_at", start.toISOString())
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  const punches = (data ?? []) as Punch[];

  const todayPunches = punches.filter((p) => {
    const d = new Date(p.created_at);

    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  });

  const workedToday = calculateWorkedTime(todayPunches);
  const workedLast30Days = calculateWorkedTime(punches);

  const lastPunch =
    punches.length > 0
      ? new Date(
          punches[punches.length - 1].created_at
        ).toLocaleString("es-ES")
      : "--";

  return {
    workedToday:
      workedToday?.formatted ?? "00:00",

    workedMonth:
      workedLast30Days?.formatted ?? "00:00",

    punchesToday: todayPunches.length,

    lastPunch,
  };
}