"use client";

import { useSchedules } from "@/hooks/useSchedules";
import { ScheduleCard } from "./schedule-card";

export function SchedulesList() {
  const {
    schedules,
    loading,
  } = useSchedules();

  if (loading) {
    return (
      <div className="py-10 text-center text-slate-500">
        Cargando horarios...
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

      {schedules.map((schedule) => (

        <ScheduleCard
          key={schedule.id}
          schedule={schedule}
        />

      ))}

    </div>
  );
}