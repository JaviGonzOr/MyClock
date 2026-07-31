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

  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  const { data, error } = await supabase
    .from("punches")
    .select(
      "id,user_id,event_type,created_at,latitude,longitude,accuracy"
    )
    .eq("user_id", userId)
    .gte("created_at", startOfMonth.toISOString())
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  const punches = (data ?? []) as Punch[];

  const todayIso = startOfToday.toISOString();

  const todayPunches = punches.filter(
    (p) => p.created_at >= todayIso
  );

  const workedToday = calculateWorkedTime(todayPunches);
  const workedMonth = calculateWorkedTime(punches);

  const lastPunch =
    punches.length > 0
      ? new Date(
          punches[punches.length - 1].created_at
        ).toLocaleString("es-ES")
      : "--";

  return {
    workedToday:
      workedToday?.formatted ?? "--:--",

    workedMonth:
      workedMonth?.formatted ?? "--:--",

    punchesToday: todayPunches.length,

    lastPunch,
  };
}