"use client";

import { Download } from "lucide-react";

import { exportCSV } from "@/services/export.service";

export function ExportReportButton() {
  async function download() {
    try {
      const response = await fetch(
        "/api/admin/reports"
      );

      if (!response.ok) {
        throw new Error();
      }

      const reports =
        await response.json();

      exportCSV(reports);

    } catch (e) {

      console.error(e);

      alert(
        "No se pudo generar el informe."
      );

    }
  }

  return (
    <button
      onClick={download}
      className="flex items-center gap-3 rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
    >
      <Download size={18} />

      Exportar CSV
    </button>
  );
}