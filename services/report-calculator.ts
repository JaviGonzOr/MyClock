import { Punch } from "@/types/punch";

export interface ReportResult {
  workedMinutes: number;
  overtimeMinutes: number;
  lateMinutes: number;
}

export function calculateReport(
  punches: Punch[]
): ReportResult {
  let workedMinutes = 0;

  let clockIn: Date | null = null;

  for (const punch of punches) {
    switch (punch.event_type) {
      case "clock_in":
      case "break_end":
        clockIn = new Date(
          punch.created_at
        );
        break;

      case "break_start":
        if (clockIn) {
          workedMinutes += Math.floor(
            (
              new Date(
                punch.created_at
              ).getTime() -
              clockIn.getTime()
            ) / 60000
          );
        }

        clockIn = null;
        break;

      case "clock_out":
        if (clockIn) {
          workedMinutes += Math.floor(
            (
              new Date(
                punch.created_at
              ).getTime() -
              clockIn.getTime()
            ) / 60000
          );
        }

        clockIn = null;
        break;
    }
  }

  // Si el empleado sigue trabajando
  if (clockIn) {
    workedMinutes += Math.floor(
      (Date.now() -
        clockIn.getTime()) /
        60000
    );
  }

  const overtimeMinutes = Math.max(
    workedMinutes - 8 * 60,
    0
  );

  return {
    workedMinutes,
    overtimeMinutes,
    lateMinutes: 0,
  };
}