import {
  employeeRepository,
  EmployeeData,
} from "@/repositories/employee.repository";
import { supabase } from "@/lib/supabase/client";
import { Punch } from "@/types/punch";

class EmployeeService {
  async list() {
    return employeeRepository.all();
  }

  async punches(userId: string): Promise<Punch[]> {
    const { data, error } = await supabase
      .from("punches")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    return (data ?? []) as Punch[];
  }

  get(id: string) {
    return employeeRepository.byId(id);
  }

  create(data: EmployeeData) {
    return employeeRepository.create(data);
  }

  update(id: string, data: Partial<EmployeeData>) {
    return employeeRepository.update(id, data);
  }

  updateAvatar(id: string, avatar: string) {
    return employeeRepository.updateAvatar(id, avatar);
  }

  enable(id: string) {
    return employeeRepository.enable(id);
  }

  disable(id: string) {
    return employeeRepository.disable(id);
  }
}

export const employeeService = new EmployeeService();