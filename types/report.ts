export interface MonthlyReport {
  employeeId: string;
  employee: string;

  workedMinutes: number;
  overtimeMinutes: number;
  lateMinutes: number;

  punches: number;
}