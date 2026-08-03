import { createClient } from "@/lib/supabase/server";

import { MonthlyReport } from "@/types/report";
import { Punch } from "@/types/punch";

import { calculateReport } from "./report-calculator";

interface EmployeeReport extends MonthlyReport {
  __punches: Punch[];
}

export async function getMonthlyReports(): Promise<MonthlyReport[]> {
  const supabase = await createClient();

  const start = new Date();
  start.setDate(start.getDate() - 30);

  const { data: punches, error: punchesError } = await supabase
    .from("punches")
    .select("*")
    .gte("created_at", start.toISOString())
    .order("created_at");

  if (punchesError) throw punchesError;

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id,full_name");

  if (profilesError) throw profilesError;

  const profileMap = new Map<string, string>();

  for (const profile of profiles ?? []) {
    profileMap.set(profile.id, profile.full_name);
  }

  const reports = new Map<string, EmployeeReport>();

  for (const punch of (punches as Punch[]) ?? []) {
    const employeeId = punch.user_id;

    if (!reports.has(employeeId)) {
      reports.set(employeeId, {
        employeeId,
        employee: profileMap.get(employeeId) ?? "Empleado",
        workedMinutes: 0,
        overtimeMinutes: 0,
        lateMinutes: 0,
        punches: 0,
        __punches: [],
      });
    }

    const report = reports.get(employeeId)!;

    report.punches++;
    report.__punches.push(punch);
  }

  const result: MonthlyReport[] = [];

  for (const report of reports.values()) {
    const calculation = calculateReport(report.__punches);

    result.push({
      employeeId: report.employeeId,
      employee: report.employee,
      punches: report.punches,
      workedMinutes: calculation.workedMinutes,
      overtimeMinutes: calculation.overtimeMinutes,
      lateMinutes: calculation.lateMinutes,
    });
  }

  return result.sort((a, b) =>
    a.employee.localeCompare(b.employee)
  );
}