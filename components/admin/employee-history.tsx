"use client";

import {
  Clock,
  LogIn,
  LogOut,
  Coffee,
} from "lucide-react";

import { Punch } from "@/types/punch";

type Props = {
  punches: Punch[];
};

export function EmployeeHistory({
  punches,
}: Props) {
  return (
    <div className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Historial de fichajes
        </h2>

      </div>

      <div className="divide-y divide-slate-100">

        {punches.length === 0 && (

          <div className="p-8 text-center text-slate-500">

            Sin fichajes

          </div>

        )}

        {punches.map((punch) => (

          <div
            key={punch.id}
            className="flex items-center justify-between p-5"
          >

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-slate-100 p-3">

                {punch.event_type === "clock_in" && (
                  <LogIn className="text-green-600" />
                )}

                {punch.event_type === "clock_out" && (
                  <LogOut className="text-red-600" />
                )}

                {punch.event_type === "break_start" && (
                  <Coffee className="text-orange-500" />
                )}

                {punch.event_type === "break_end" && (
                  <Clock className="text-violet-600" />
                )}

              </div>

              <div>

                <p className="font-semibold text-slate-900">

                  {punch.event_type
                    .replace("_", " ")
                    .toUpperCase()}

                </p>

                <p className="text-sm text-slate-500">

                  {new Date(
                    punch.created_at
                  ).toLocaleString("es-ES")}

                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}