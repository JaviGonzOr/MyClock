import { BaseRepository } from "./base.repository";
import { Schedule } from "@/types/schedule";

export type ScheduleData = Omit<
  Schedule,
  "id" | "created_at"
>;

class ScheduleRepository extends BaseRepository {
  async all(): Promise<Schedule[]> {
    const { data, error } = await this.db
      .from("schedules")
      .select("*")
      .order("name");

    if (error) {
      throw error;
    }

    return (data ?? []) as Schedule[];
  }

  async byId(id: string): Promise<Schedule | null> {
    const { data, error } = await this.db
      .from("schedules")
      .select("*")
      .eq("id", id);

    console.log("========== SCHEDULE BY ID ==========");
    console.log("SCHEDULE ID:", id);
    console.log("SCHEDULE DATA:", data);
    console.log("SCHEDULE ERROR:", error);
    console.log("====================================");

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return null;
    }

    return data[0] as Schedule;
  }

  async create(data: ScheduleData): Promise<Schedule> {
    const { data: schedule, error } = await this.db
      .from("schedules")
      .insert(data)
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return schedule as Schedule;
  }

  async update(
    id: string,
    data: Partial<ScheduleData>
  ): Promise<Schedule> {
    const { data: schedule, error } = await this.db
      .from("schedules")
      .update(data)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return schedule as Schedule;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.db
      .from("schedules")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }
  }
}

export const scheduleRepository =
  new ScheduleRepository();