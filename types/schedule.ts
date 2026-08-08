export interface Schedule {
  id: string;

  name: string;

  monday_start: string | null;
  monday_end: string | null;

  tuesday_start: string | null;
  tuesday_end: string | null;

  wednesday_start: string | null;
  wednesday_end: string | null;

  thursday_start: string | null;
  thursday_end: string | null;

  friday_start: string | null;
  friday_end: string | null;

  saturday_start: string | null;
  saturday_end: string | null;

  sunday_start: string | null;
  sunday_end: string | null;

  break_minutes: number;

  created_at: string;
}