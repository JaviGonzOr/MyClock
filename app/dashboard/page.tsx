"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Header } from "@/components/dashboard/header";
import { StatusCard } from "@/components/dashboard/status-card";
import { LiveTimer } from "@/components/dashboard/live-timer";
import { DashboardSummary } from "@/components/dashboard/dashboard-summary";
import { ClockButton } from "@/components/dashboard/clock-button";

import { getCurrentUser } from "@/services/auth";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const router = useRouter();

  const dashboard = useDashboard();

  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser();

      if (!user) {
        router.replace("/login");
      }
    }

    checkAuth();
  }, [router]);

  if (dashboard.loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="animate-pulse text-slate-500">Cargando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-md flex-col gap-5 p-6 pb-28">
        <Header name={dashboard.name} />

        <StatusCard
          status={dashboard.status}
          lastPunchTime={dashboard.lastPunchTime}
        />

        <LiveTimer
          working={dashboard.status === "working"}
          startTime={dashboard.sessionStart}
        />

        <DashboardSummary
          firstClockIn={dashboard.summary.firstClockIn}
          lastClockOut={dashboard.summary.lastClockOut}
          workedTime={dashboard.summary.workedTime}
          breaks={dashboard.summary.breaks}
        />

        <ClockButton
          status={dashboard.status}
          onPunchCreated={dashboard.refresh}
        />
      </div>
    </main>
  );
}
