"use client";

import { CalendarDays } from "lucide-react";

export function WorkCalendar() {
  const days = Array.from({ length: 35 });

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
          <CalendarDays size={22} />
        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Calendario
          </h2>

          <p className="text-slate-500">
            Vista mensual de jornadas
          </p>

        </div>

      </div>

      <div className="grid grid-cols-7 gap-3">

        {days.map((_, index) => (

          <button
            key={index}
            className="aspect-square rounded-2xl border border-slate-200 bg-slate-50 transition hover:border-violet-500 hover:bg-violet-50"
          >

            <div className="flex h-full flex-col items-center justify-center">

              <span className="text-lg font-bold text-slate-900">
                {index + 1}
              </span>

              <span className="mt-1 text-xs text-slate-500">
                0h
              </span>

            </div>

          </button>

        ))}

      </div>

    </div>
  );
}