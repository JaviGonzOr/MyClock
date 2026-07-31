export type VacationStatus =
  | "pending"
  | "approved"
  | "rejected";

export interface Vacation {

  id:string;

  user_id:string;

  start_date:string;

  end_date:string;

  days:number;

  status:VacationStatus;

  comment:string|null;

  approved_by:string|null;

  approved_at:string|null;

  created_at:string;

}