"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";



import { employeeService } from "@/services/employee.service";
import { useSchedules } from "@/hooks/useSchedules";

type Employee = {
  id: string;
  full_name: string;
  email: string;
  role: "admin" | "employee";
  active: boolean;
  avatar_url: string | null;
  schedule_id?: string | null;
};

type Props = {
  employee: Employee;
};

export function EmployeeEditForm({ employee }: Props) {
  const router = useRouter();

  const { schedules, loading: schedulesLoading } = useSchedules();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(employee);

  function updateField(field: keyof Employee, value: any) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function save() {
    try {
      setLoading(true);

      await employeeService.update(employee.id, {
        full_name: form.full_name,
        email: form.email,
        role: form.role,
        active: form.active,
        schedule_id: form.schedule_id ?? null,
      });

      router.refresh();

      alert("Empleado actualizado");
    } catch (e) {
      console.error(e);

      alert("No se pudo guardar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      
      <div className="mt-8 space-y-6">
        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            Nombre
          </label>

          <input
            value={form.full_name}
            onChange={(e) => updateField("full_name", e.target.value)}
            className="w-full rounded-xl border border-slate-300 p-3 text-slate-900"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            Email
          </label>

          <input
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full rounded-xl border border-slate-300 p-3 text-slate-900"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-slate-700">Rol</label>

          <select
            value={form.role}
            onChange={(e) =>
              updateField("role", e.target.value as "admin" | "employee")
            }
            className="w-full rounded-xl border border-slate-300 p-3 text-slate-900"
          >
            <option value="employee">Empleado</option>

            <option value="admin">Administrador</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            Horario
          </label>

          <select
            value={form.schedule_id ?? ""}
            onChange={(e) => updateField("schedule_id", e.target.value || null)}
            className="w-full rounded-xl border border-slate-300 p-3 text-slate-900"
          >
            <option value="">Sin horario</option>

            {schedules.map((schedule) => (
              <option key={schedule.id} value={schedule.id}>
                {schedule.name}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => updateField("active", e.target.checked)}
          />

          <span className="text-slate-700">Empleado activo</span>
        </label>

        <button
          disabled={loading}
          onClick={save}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-violet-600 py-4 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
        >
          <Save size={20} />
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
