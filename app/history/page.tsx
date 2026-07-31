"use client";

import { useEffect, useState } from "react";

import {
  HistoryDay,
  getHistory,
} from "@/services/history";

import {
  DashboardStats,
  getStats,
} from "@/services/stats";

import { HistoryStats } from "@/components/history/history-stats";

export default function HistoryPage() {
  const [history, setHistory] =
    useState<HistoryDay[]>([]);

  const [stats, setStats] =
    useState<DashboardStats>({
      today: "--",
      week: "--",
      month: "--",
      overtime: "--",
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      const [historyData, statsData] =
        await Promise.all([
          getHistory(),
          getStats(),
        ]);

      setHistory(historyData);

      setStats(statsData);

      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Cargando...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-md flex-col gap-5 p-6 pb-28">

        <div>

          <h1 className="text-3xl font-bold">
            Historial
          </h1>

          <p className="text-slate-500">
            Resumen de jornadas
          </p>

        </div>

        <HistoryStats
          today={stats.today}
          week={stats.week}
          month={stats.month}
          overtime={stats.overtime}
        />

        {history.map((day) => (
          <div
            key={day.date}
            className="rounded-3xl border bg-white p-5 shadow-sm"
          >
            <div className="mb-5">

              <h2 className="text-lg font-bold">
                {new Date(day.date).toLocaleDateString(
                  "es-ES",
                  {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  }
                )}
              </h2>

              <p className="text-sm text-slate-500">
                {day.workedTime}
              </p>

            </div>

            <div className="space-y-3">

              {day.punches.map((punch) => (
                <div
                  key={punch.id}
                  className="flex items-center justify-between"
                >
                  <span className="font-medium">
                    {punch.event_type ===
                    "clock_in"
                      ? "🟢 Entrada"
                      : "🔴 Salida"}
                  </span>

                  <span>
                    {new Date(
                      punch.created_at
                    ).toLocaleTimeString(
                      "es-ES",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </span>
                </div>
              ))}

            </div>
          </div>
        ))}

      </div>
    </main>
  );
}