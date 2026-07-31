import { getPunchesToday } from "./punches";
import { calculateWorkedTime } from "./time";

export interface DashboardSummaryData {
  firstClockIn: string;
  lastClockOut: string;
  workedTime: string;
  breaks: number;
}

function formatHour(date: string) {
  return new Date(date).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function getDashboardSummary(): Promise<DashboardSummaryData> {
  const punches = await getPunchesToday();

  const firstClockIn = punches.find(
    (p) => p.event_type === "clock_in"
  );

  const lastClockOut = [...punches]
    .reverse()
    .find((p) => p.event_type === "clock_out");

  const worked = calculateWorkedTime(punches);

  const breaks = punches.filter(
    (p) => p.event_type === "break_start"
  ).length;

  return {
    firstClockIn: firstClockIn
      ? formatHour(firstClockIn.created_at)
      : "--:--",

    lastClockOut: lastClockOut
      ? formatHour(lastClockOut.created_at)
      : "--:--",

    workedTime: worked.formatted,

    breaks,
  };
}