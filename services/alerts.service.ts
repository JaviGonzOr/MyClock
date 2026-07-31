import { createClient } from "@/lib/supabase/server";

export interface Alert {
  id: string;

  type:
    | "missing"
    | "late"
    | "working"
    | "vacation"
    | "overtime";

  employee: string;

  message: string;
}

export async function getAlerts(): Promise<Alert[]> {
  const supabase = await createClient();

  const alerts: Alert[] = [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [employeesResult, punchesResult] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("id,full_name"),

      supabase
        .from("punches")
        .select("*")
        .gte(
          "created_at",
          today.toISOString()
        )
        .order("created_at", {
          ascending: false,
        }),
    ]);

  if (employeesResult.error) {
    throw employeesResult.error;
  }

  if (punchesResult.error) {
    throw punchesResult.error;
  }

  const employees =
    employeesResult.data ?? [];

  const punches =
    punchesResult.data ?? [];

  for (const employee of employees) {
    const employeePunches = punches
      .filter(
        (p) =>
          p.user_id === employee.id
      )
      .sort(
        (a, b) =>
          new Date(
            b.created_at
          ).getTime() -
          new Date(
            a.created_at
          ).getTime()
      );

    if (
      employeePunches.length === 0
    ) {
      alerts.push({
        id: employee.id,
        type: "missing",
        employee:
          employee.full_name,
        message:
          "No ha fichado hoy",
      });

      continue;
    }

    const lastPunch =
      employeePunches[0];

    if (
      lastPunch.event_type ===
      "break_start"
    ) {
      alerts.push({
        id:
          employee.id +
          "-break",
        type: "working",
        employee:
          employee.full_name,
        message:
          "Está en descanso",
      });
    }

    if (
      lastPunch.event_type ===
      "clock_in"
    ) {
      const hours =
        (Date.now() -
          new Date(
            lastPunch.created_at
          ).getTime()) /
        3600000;

      if (hours >= 8) {
        alerts.push({
          id:
            employee.id +
            "-overtime",
          type: "overtime",
          employee:
            employee.full_name,
          message:
            "Más de 8 horas trabajando",
        });
      }
    }
  }

  return alerts;
}