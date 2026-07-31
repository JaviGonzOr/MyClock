import { supabase } from "@/lib/supabase/client";
import { Punch } from "@/types/punch";
import { calculateWorkedTime } from "./time";

export interface HistoryDay {
  date: string;
  punches: Punch[];
  workedTime: string;
}

export async function getHistory(): Promise<HistoryDay[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("punches")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw new Error(error.message);

  const grouped = new Map<string, Punch[]>();

  for (const punch of (data as Punch[]) ?? []) {
    const day = punch.created_at.slice(0, 10);

    if (!grouped.has(day)) {
      grouped.set(day, []);
    }

    grouped.get(day)!.push(punch);
  }

  return [...grouped.entries()].map(
    ([date, punches]) => ({
      date,
      punches,
      workedTime:
        calculateWorkedTime(
          [...punches].reverse()
        ).formatted,
    })
  );
}