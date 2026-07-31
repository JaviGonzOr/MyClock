"use client";

import { useEffect, useState } from "react";

import { Schedule } from "@/types/schedule";
import { scheduleService } from "@/services/schedule.service";

export function useSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      setLoading(true);

      const data = await scheduleService.list();

      setSchedules(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return {
    schedules,
    loading,
    refresh,
  };
}