import { Punch } from "@/types/punch";


export type WorkStatus =
  | "clocked_out"
  | "working"
  | "on_break";

export interface WorkedTime {
  milliseconds: number;
  hours: number;
  minutes: number;
  formatted: string;

  status: WorkStatus;
}

export function calculateWorkedTime(
  punches: Punch[]
): WorkedTime {
  let milliseconds = 0;

  let currentClockIn: Date | null = null;

  let status: WorkStatus = "clocked_out";

  for (const punch of punches) {
    switch (punch.event_type) {
      case "clock_in":
        currentClockIn = new Date(punch.created_at);
        status = "working";
        break;

      case "break_start":
        if (currentClockIn) {
          milliseconds +=
            new Date(punch.created_at).getTime() -
            currentClockIn.getTime();

          currentClockIn = null;
        }

        status = "on_break";
        break;

      case "break_end":
        currentClockIn = new Date(
          punch.created_at
        );

        status = "working";
        break;

      case "clock_out":
        if (currentClockIn) {
          milliseconds +=
            new Date(punch.created_at).getTime() -
            currentClockIn.getTime();
        }

        currentClockIn = null;

        status = "clocked_out";
        break;
    }
  }

  if (status === "working" && currentClockIn) {
    milliseconds +=
      Date.now() -
      currentClockIn.getTime();
  }

  const totalMinutes = Math.floor(
    milliseconds / 60000
  );

  const hours = Math.floor(totalMinutes / 60);

  const minutes = totalMinutes % 60;

  return {
    milliseconds,

    hours,

    minutes,

    formatted: `${hours
      .toString()
      .padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`,

    status,
  };
}