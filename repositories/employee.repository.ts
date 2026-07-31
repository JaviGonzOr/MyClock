import { BaseRepository } from "./base.repository";
import { Employee } from "@/types/employee";

export type EmployeeData = Omit<Employee, "id" | "created_at">;

class EmployeeRepository extends BaseRepository {
  async all(): Promise<Employee[]> {
    const { data, error } = await this.db
      .from("profiles")
      .select(
        `
        *,
        companies (
          id,
          name
        )
        `,
      )
      .order("full_name");

    if (error) throw error;

    return (data ?? []) as Employee[];
  }

  async byId(id: string): Promise<Employee | null> {
    const { data, error } = await this.db
      .from("profiles")
      .select(
        `
        *,
        companies (
          id,
          name
        )
        `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;

    return (data as Employee) ?? null;
  }

  async create(data: EmployeeData) {
    const { data: employee, error } = await this.db
      .from("profiles")
      .insert(data)
      .select()
      .single();

    if (error) throw error;

    return employee as Employee;
  }

  async update(id: string, data: Partial<EmployeeData>) {
    const { data: employee, error } = await this.db
      .from("profiles")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return employee as Employee;
  }

  async updateAvatar(id: string, avatar: string) {
    return this.update(id, {
      avatar_url: avatar,
    });
  }

  async enable(id: string) {
    return this.update(id, {
      active: true,
    });
  }

  async disable(id: string) {
    return this.update(id, {
      active: false,
    });
  }
}

export const employeeRepository = new EmployeeRepository();