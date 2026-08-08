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

type ScheduleFormData = {
  name: string;

  monday_start: string | null;
  monday_end: string | null;

  tuesday_start: string | null;
  tuesday_end: string | null;

  wednesday_start: string | null;
  wednesday_end: string | null;

  thursday_start: string | null;
  thursday_end: string | null;

  friday_start: string | null;
  friday_end: string | null;

  saturday_start: string | null;
  saturday_end: string | null;

  sunday_start: string | null;
  sunday_end: string | null;

  break_minutes: number;
};

const initialForm: ScheduleFormData = {
  name: "",

  monday_start: null,
  monday_end: null,

  tuesday_start: null,
  tuesday_end: null,

  wednesday_start: null,
  wednesday_end: null,

  thursday_start: null,
  thursday_end: null,

  friday_start: null,
  friday_end: null,

  saturday_start: null,
  saturday_end: null,

  sunday_start: null,
  sunday_end: null,

  break_minutes: 30,
};

export function ScheduleForm() {
  const router = useRouter();

  const [form, setForm] = useState<ScheduleFormData>(initialForm);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(key: keyof ScheduleFormData, value: string | number | null) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setError("");
  }

  async function save() {
    try {
      setLoading(true);
      setError("");

      if (!form.name.trim()) {
        setError("Introduce un nombre para el horario.");
        return;
      }

      await scheduleService.create(form);

      router.push("/admin/schedules");
      router.refresh();
    } catch (error: any) {
      console.error("ERROR COMPLETO:", error);

      setError(
        error?.message ||
          error?.details ||
          error?.hint ||
          "No se pudo guardar el horario.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-black text-slate-900">Nuevo horario</h2>

      <p className="mt-2 text-slate-500">
        Define las horas de trabajo para cada día.
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            Nombre del horario
          </label>

          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Ej. Jornada estándar"
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />
        </div>

        <div className="grid grid-cols-[1fr_150px_150px] gap-4 px-1">
          <div />

          <div className="text-center text-sm font-bold text-slate-600">
            Entrada
          </div>

          <div className="text-center text-sm font-bold text-slate-600">
            Salida
          </div>
        </div>

        <div className="space-y-3">
          {days.map(([key, label]) => {
            const startKey = `${key}_start` as keyof ScheduleFormData;

            const endKey = `${key}_end` as keyof ScheduleFormData;

            return (
              <div
                key={key}
                className="grid grid-cols-[1fr_150px_150px] items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="font-bold text-slate-900">{label}</p>

                <input
                  type="time"
                  value={(form[startKey] as string | null) ?? ""}
                  onChange={(e) => update(startKey, e.target.value || null)}
                  className="w-full rounded-xl border border-slate-300 bg-white p-3 text-center font-semibold text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />

                <input
                  type="time"
                  value={(form[endKey] as string | null) ?? ""}
                  onChange={(e) => update(endKey, e.target.value || null)}
                  className="w-full rounded-xl border border-slate-300 bg-white p-3 text-center font-semibold text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>
            );
          })}
        </div>

        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            Descanso
          </label>

          <div className="flex items-center gap-3">
            <input
              type="number"
              min="0"
              step="5"
              value={form.break_minutes}
              onChange={(e) => update("break_minutes", Number(e.target.value))}
              className="w-40 rounded-xl border border-slate-300 bg-white p-3 text-center text-lg font-bold text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />

            <span className="text-slate-600">minutos</span>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 font-semibold text-red-700">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={save}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-violet-600 py-4 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={20} />

          {loading ? "Guardando..." : "Guardar horario"}
        </button>
      </div>
    </div>
  );
}
