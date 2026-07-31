"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Power, RotateCcw } from "lucide-react";

import { employeeService } from "@/services/employee.service";

type Props = {
  id: string;
  active: boolean;
};

export function EmployeeActions({
  id,
  active,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function changeStatus() {
    const confirmText = active
      ? "¿Desactivar este empleado?"
      : "¿Reactivar este empleado?";

    if (!confirm(confirmText)) {
      return;
    }

    try {
      setLoading(true);

      if (active) {
        await employeeService.disable(id);
      } else {
        await employeeService.enable(id);
      }

      router.refresh();
    } catch (e) {
      console.error(e);
      alert("No se pudo actualizar el empleado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      disabled={loading}
      onClick={changeStatus}
      className={`flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white transition ${
        active
          ? "bg-red-600 hover:bg-red-700"
          : "bg-emerald-600 hover:bg-emerald-700"
      } disabled:opacity-50`}
    >
      {active ? (
        <>
          <Power size={18} />
          Desactivar
        </>
      ) : (
        <>
          <RotateCcw size={18} />
          Reactivar
        </>
      )}
    </button>
  );
}