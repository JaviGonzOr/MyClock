"use client";

import { Download } from "lucide-react";
import { exportCSV } from "@/services/export.service";

export function ExportReportButton() {
  async function download() {
    try {
      const today = new Date();

      const response = await fetch(
        `/api/admin/reports?year=${today.getFullYear()}&month=${today.getMonth()}`
      );

      if (!response.ok) {
        throw new Error();
      }

      const reports = await response.json();

      exportCSV(reports);
    } catch (error) {
      console.error(error);
      alert("No se pudo exportar el informe.");
    }
  }

  return (
    <button
      onClick={download}
      className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700"
    >
      <Download size={18} />
      Exportar CSV
    </button>
  );
}