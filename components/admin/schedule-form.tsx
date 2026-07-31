"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

import { scheduleService } from "@/services/schedule.service";

const days = [
  ["monday", "Lunes"],
  ["tuesday", "Martes"],
  ["wednesday", "Miércoles"],
  ["thursday", "Jueves"],
  ["friday", "Viernes"],
  ["saturday", "Sábado"],
  ["sunday", "Domingo"],
] as const;

export function ScheduleForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<any>({
    name: "",
    break_minutes: 30,
  });

  function update(key: string, value: any) {
    setForm((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function save() {
    try {
      setLoading(true);

      await scheduleService.create(form);

      router.push("/admin/schedules");

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <h2 className="text-3xl font-black text-slate-900">
        Nuevo horario
      </h2>

      <div className="mt-8 space-y-6">

        <div>

          <label className="mb-2 block font-semibold text-slate-700">
            Nombre
          </label>

          <input
            value={form.name}
            onChange={(e) =>
              update("name", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 p-3 text-slate-900"
          />

        </div>

        {days.map(([key, label]) => (

          <div
            key={key}
            className="grid grid-cols-3 gap-4 items-end"
          >

            <div>

              <label className="block font-semibold text-slate-700">
                {label}
              </label>

            </div>

            <input
              type="time"
              value={form[`${key}_start`] ?? ""}
              onChange={(e) =>
                update(
                  `${key}_start`,
                  e.target.value
                )
              }
              className="rounded-xl border border-slate-300 p-3"
            />

            <input
              type="time"
              value={form[`${key}_end`] ?? ""}
              onChange={(e) =>
                update(
                  `${key}_end`,
                  e.target.value
                )
              }
              className="rounded-xl border border-slate-300 p-3"
            />

          </div>

        ))}

        <div>

          <label className="mb-2 block font-semibold text-slate-700">
            Descanso (minutos)
          </label>

          <input
            type="number"
            value={form.break_minutes}
            onChange={(e) =>
              update(
                "break_minutes",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-slate-300 p-3"
          />

        </div>

        <button
          onClick={save}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-violet-600 py-4 font-semibold text-white"
        >

          <Save size={20} />

          Guardar horario

        </button>

      </div>

    </div>
  );
}