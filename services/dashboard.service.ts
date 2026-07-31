/*import { employeeRepository } from "@/repositories/employee.repository";
import { companyRepository } from "@/repositories/company.repository";
import { punchRepository } from "@/repositories/punch.repository";

export interface DashboardData {
  employees: number;
  companies: number;
  working: number;
  punchesToday: number;
}

class DashboardService {
  async load(): Promise<DashboardData> {
    const [
      employees,
      companies,
      working,
      punchesToday,
    ] = await Promise.all([
      employeeRepository.count(),
      companyRepository.count(),
      punchRepository.currentlyWorking(),
      punchRepository.todayCount(),
    ]);

    return {
      employees,
      companies,
      working,
      punchesToday,
    };
  }
}

export const dashboardService =
  new DashboardService();*/