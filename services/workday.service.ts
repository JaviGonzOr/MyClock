import { Punch } from "@/types/punch";
import { Schedule } from "@/types/schedule";

export interface WorkdayResult {
  expectedStart: string;
  expectedEnd: string;

  realStart: string;
  realEnd: string;

  workedMinutes: number;

  breakMinutes: number;

  lateMinutes: number;

  earlyLeaveMinutes: number;

  overtimeMinutes: number;

  completed: boolean;
}

function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);

  return h * 60 + m;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function calculateWorkday(
  punches: Punch[],
  schedule: Schedule
): WorkdayResult {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ] as const;

  const today = days[new Date().getDay()];

  const expectedStart =
    schedule[`${today}_start`] ?? "";

  const expectedEnd =
    schedule[`${today}_end`] ?? "";

  if (!expectedStart || !expectedEnd) {
    return {
      expectedStart: "--:--",
      expectedEnd: "--:--",
      realStart: "--:--",
      realEnd: "--:--",

      workedMinutes: 0,

      breakMinutes: 0,

      lateMinutes: 0,

      earlyLeaveMinutes: 0,

      overtimeMinutes: 0,

      completed: false,
    };
  }

  let workedMinutes = 0;

  let breakMinutes = 0;

  let currentWork: Date | null = null;

  let currentBreak: Date | null = null;

  let firstClockIn: Date | null = null;

  let lastClockOut: Date | null = null;

  for (const punch of punches) {
    const date = new Date(
      punch.created_at
    );

    switch (punch.event_type) {
      case "clock_in":
        currentWork = date;

        if (!firstClockIn) {
          firstClockIn = date;
        }

        break;

      case "break_start":
        if (currentWork) {
          workedMinutes += Math.floor(
            (date.getTime() -
              currentWork.getTime()) /
              60000
          );
        }

        currentWork = null;

        currentBreak = date;

        break;

      case "break_end":
        if (currentBreak) {
          breakMinutes += Math.floor(
            (date.getTime() -
              currentBreak.getTime()) /
              60000
          );
        }

        currentBreak = null;

        currentWork = date;

        break;

      case "clock_out":
        if (currentWork) {
          workedMinutes += Math.floor(
            (date.getTime() -
              currentWork.getTime()) /
              60000
          );
        }

        currentWork = null;

        lastClockOut = date;

        break;
    }
  }

  if (currentWork) {
    workedMinutes += Math.floor(
      (Date.now() -
        currentWork.getTime()) /
        60000
    );
  }

  const realStart = firstClockIn
    ? formatTime(firstClockIn)
    : "--:--";

  const realEnd = lastClockOut
    ? formatTime(lastClockOut)
    : "--:--";

  const lateMinutes = firstClockIn
    ? Math.max(
        0,
        timeToMinutes(realStart) -
          timeToMinutes(expectedStart)
      )
    : 0;

  const earlyLeaveMinutes = lastClockOut
    ? Math.max(
        0,
        timeToMinutes(expectedEnd) -
          timeToMinutes(realEnd)
      )
    : 0;

  const overtimeMinutes = lastClockOut
    ? Math.max(
        0,
        timeToMinutes(realEnd) -
          timeToMinutes(expectedEnd)
      )
    : 0;

  return {
    expectedStart,

    expectedEnd,

    realStart,

    realEnd,

    workedMinutes,

    breakMinutes,

    lateMinutes,

    earlyLeaveMinutes,

    overtimeMinutes,

    completed: !!lastClockOut,
  };
}