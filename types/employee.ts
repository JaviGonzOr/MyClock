export type EmployeeRole = "admin" | "employee";

export interface Employee {
  id: string;

  full_name: string;

  email: string;

  avatar_url: string | null;

  role: EmployeeRole;

  active: boolean;

  company_id: string | null;

  created_at: string;

  schedule_id: string | null;

  companies?: {
    id: string;
    name: string;
  } | null;
}
