import {
  scheduleRepository,
  ScheduleData,
} from "@/repositories/schedule.repository";

class ScheduleService {
  async assignToEmployee(
    employeeId: string,
    scheduleId: string | null
  ) {
    const { supabase } = await import(
      "@/lib/supabase/client"
    );

    const { error } = await supabase
      .from("profiles")
      .update({
        schedule_id: scheduleId,
      })
      .eq("id", employeeId);

    if (error) {
      throw error;
    }
  }

  list() {
    return scheduleRepository.all();
  }

  get(id: string) {
    return scheduleRepository.byId(id);
  }

  create(data: ScheduleData) {
    return scheduleRepository.create(data);
  }

  update(
    id: string,
    data: Partial<ScheduleData>
  ) {
    return scheduleRepository.update(id, data);
  }

  delete(id: string) {
    return scheduleRepository.delete(id);
  }
}

export const scheduleService =
  new ScheduleService();