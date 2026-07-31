import { createClient } from "@/lib/supabase/server";

import { MonthlyReport } from "@/types/report";
import { Punch } from "@/types/punch";

import { calculateReport } from "./report-calculator";

interface EmployeeReport extends MonthlyReport {
  __punches: Punch[];
}

export async function getMonthlyReports(): Promise<MonthlyReport[]> {
  const supabase = await createClient();

  const start = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  const [
    punchesResult,
    profilesResult,
  ] = await Promise.all([
    supabase
      .from("punches")
      .select("*")
      .gte(
        "created_at",
        start.toISOString()
      )
      .order("created_at"),

    supabase
      .from("profiles")
      .select("id,full_name"),
  ]);

  if (punchesResult.error) {
    throw punchesResult.error;
  }

  if (profilesResult.error) {
    throw profilesResult.error;
  }

  const profileMap = new Map<
    string,
    string
  >();

  for (const profile of profilesResult.data ?? []) {
    profileMap.set(
      profile.id,
      profile.full_name
    );
  }

  const reports = new Map<
    string,
    EmployeeReport
  >();

  for (const row of punchesResult.data as Punch[] ?? []) {
    const employeeId = row.user_id;

    if (!reports.has(employeeId)) {
      reports.set(employeeId, {
        employeeId,
        employee:
          profileMap.get(employeeId) ??
          "Empleado",
        workedMinutes: 0,
        overtimeMinutes: 0,
        lateMinutes: 0,
        punches: 0,
        __punches: [],
      });
    }

    const report = reports.get(employeeId)!;

    report.punches++;
    report.__punches.push(row);
  }

  const result: MonthlyReport[] = [];

  for (const report of reports.values()) {
    const calculation =
      calculateReport(
        report.__punches
      );

    result.push({
      employeeId:
        report.employeeId,

      employee:
        report.employee,

      workedMinutes:
        calculation.workedMinutes,

      overtimeMinutes:
        calculation.overtimeMinutes,

      lateMinutes:
        calculation.lateMinutes,

      punches:
        report.punches,
    });
  }

  return result;
}