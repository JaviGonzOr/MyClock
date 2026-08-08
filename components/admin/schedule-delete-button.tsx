"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { scheduleService } from "@/services/schedule.service";

export function ScheduleDeleteButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "¿Seguro que quieres borrar este horario?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      await scheduleService.delete(id);

      router.push("/admin/schedules");
      router.refresh();
    } catch (error) {
      console.error(
        "Error borrando horario:",
        error
      );

      alert("No se pudo borrar el horario.");

      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="mt-8 flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Trash2 size={18} />

      {loading
        ? "Borrando..."
        : "Borrar horario"}
    </button>
  );
}