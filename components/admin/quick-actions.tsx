import Link from "next/link";
import {
  Building2,
  FileText,
  Plus,
  CalendarClock,
} from "lucide-react";

export function QuickActions() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <Link
        href="/admin/employees/new"
        className="group overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-600 to-indigo-600 p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        <Plus className="mb-5 h-9 w-9 transition group-hover:scale-110" />

        <h3 className="text-xl font-bold">
          Nuevo empleado
        </h3>

        <p className="mt-2 text-sm text-violet-100">
          Crea un empleado y asígnale empresa, horario y permisos.
        </p>
      </Link>

      <Link
        href="/admin/schedules/new"
        className="group overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-600 to-sky-600 p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        <CalendarClock className="mb-5 h-9 w-9 transition group-hover:scale-110" />

        <h3 className="text-xl font-bold">
          Nuevo horario
        </h3>

        <p className="mt-2 text-sm text-indigo-100">
          Configura jornadas laborales, pausas y turnos.
        </p>
      </Link>

      <Link
        href="/admin/reports"
        className="group overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-600 to-teal-600 p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        <FileText className="mb-5 h-9 w-9 transition group-hover:scale-110" />

        <h3 className="text-xl font-bold">
          Informes
        </h3>

        <p className="mt-2 text-sm text-emerald-100">
          Exporta horas trabajadas, fichajes e incidencias.
        </p>
      </Link>

      <Link
        href="/admin/company"
        className="group overflow-hidden rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-500 to-amber-500 p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        <Building2 className="mb-5 h-9 w-9 transition group-hover:scale-110" />

        <h3 className="text-xl font-bold">
          Empresa
        </h3>

        <p className="mt-2 text-sm text-orange-100">
          Edita los datos corporativos, logotipo y configuración.
        </p>
      </Link>

    </div>
  );
}