import { getPunchesToday } from "./punches";
import { calculateWorkedTime } from "./time";

export interface DashboardStats {
  today: string;
  week: string;
  month: string;
  overtime: string;
}

export async function getStats(): Promise<DashboardStats> {
  const punches = await getPunchesToday();

  const worked = calculateWorkedTime(punches);

  const overtime =
    worked.hours > 8
      ? `${worked.hours - 8}h ${worked.minutes}m`
      : "0h";

  return {
    today: worked.formatted,
    week: "--",
    month: "--",
    overtime,
  };
}