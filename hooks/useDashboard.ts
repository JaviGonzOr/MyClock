"use client";

import { useCallback, useEffect, useState } from "react";

import { getCurrentUser } from "@/services/auth";
import {
  getCurrentSessionStart,
  getLastPunch,
} from "@/services/punches";
import {
  DashboardSummaryData,
  getDashboardSummary,
} from "@/services/dashboard";

import { useRealtimePunches } from "./useRealtimePunches";

export type DashboardStatus =
  | "working"
  | "break"
  | "offline";

export function useDashboard() {
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("Usuario");

  const [status, setStatus] =
    useState<DashboardStatus>("offline");

  const [sessionStart, setSessionStart] =
    useState<Date | null>(null);

  const [lastPunchTime, setLastPunchTime] =
    useState("--:--");

  const [summary, setSummary] =
    useState<DashboardSummaryData>({
      firstClockIn: "--:--",
      lastClockOut: "--:--",
      workedTime: "00:00",
      breaks: 0,
    });

  const refresh = useCallback(async () => {
    const [lastPunch, start, today] =
      await Promise.all([
        getLastPunch(),
        getCurrentSessionStart(),
        getDashboardSummary(),
      ]);

    setSummary(today);
    setSessionStart(start);

    if (lastPunch) {
      switch (lastPunch.event_type) {
        case "clock_in":
        case "break_end":
          setStatus("working");
          break;

        case "break_start":
          setStatus("break");
          break;

        default:
          setStatus("offline");
      }

      setLastPunchTime(
        new Date(lastPunch.created_at).toLocaleTimeString(
          "es-ES",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        )
      );
    } else {
      setStatus("offline");
      setLastPunchTime("--:--");
    }
  }, []);

  useRealtimePunches({
    onChange: refresh,
  });

  useEffect(() => {
    async function load() {
      const user = await getCurrentUser();

      if (!user) return;

      setName(
        user.user_metadata?.full_name ||
          user.email?.split("@")[0] ||
          "Usuario"
      );

      await refresh();

      setLoading(false);
    }

    load();
  }, [refresh]);

  return {
    loading,
    name,
    status,
    sessionStart,
    lastPunchTime,
    summary,
    refresh,
  };
}