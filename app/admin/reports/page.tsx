import { AdminHeader } from "@/components/admin/admin-header";
import { ReportTable } from "@/components/admin/report-table";
import { ExportReportButton } from "@/components/admin/export-report-button";

export default function ReportsPage() {
  return (
    <>
      <AdminHeader
        title="Informes"
        subtitle="Resumen mensual"
      />

      <div className="space-y-8 p-8">

        <div className="flex justify-end">

          <ExportReportButton />

        </div>

        <ReportTable />

      </div>

    </>
  );
}