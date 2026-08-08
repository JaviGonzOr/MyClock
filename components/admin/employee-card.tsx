"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";

import { Employee } from "@/types/employee";
import { StatusBadge } from "./status-badge";

export function EmployeeCard({
  employee,
}: {
  employee: Employee;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white">
            <img
              src="/mi_logo.png"
              alt="MyClock"
              className="h-full w-full object-contain p-2"
            />
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">
              {employee.full_name}
            </h2>

            <p className="text-violet-100">
              {employee.email}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6">
        <StatusBadge active={employee.active} />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">
              Rol
            </p>

            <p className="font-bold text-slate-900">
              {employee.role === "admin"
                ? "Administrador"
                : "Empleado"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Empresa
            </p>

            <p className="font-bold text-slate-900">
              {employee.companies?.name ??
                "Sin empresa"}
            </p>
          </div>
        </div>

        <Link
          href={`/admin/employees/${employee.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700"
        >
          <Pencil size={18} />
          Gestionar empleado
        </Link>
      </div>
    </div>
  );
}