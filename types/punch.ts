export type PunchEvent =
  | "clock_in"
  | "clock_out"
  | "break_start"
  | "break_end";

export interface Punch {
  id: string;
  user_id: string;

  event_type: PunchEvent;

  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;

  created_at: string;
}