"use client";

import Link from "next/link";

import { Clock3 } from "lucide-react";

import { Schedule } from "@/types/schedule";

export function ScheduleCard({
  schedule,
}: {
  schedule: Schedule;
}) {
  return (
    <Link
      href={`/admin/schedules/${schedule.id}`}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-xl"
    >

      <div className="flex justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            {schedule.name}
          </h2>

          <p className="mt-2 text-slate-500">
            Descanso: {schedule.break_minutes} min
          </p>

        </div>

        <div className="rounded-2xl bg-violet-100 p-4 text-violet-700">

          <Clock3 size={24} />

        </div>

      </div>

    </Link>
  );
}