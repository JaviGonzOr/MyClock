import { getMonthlyReports } from "@/services/report.service";
import { ReportSummary } from "./report-summary";

export async function ReportTable() {
  const reports = await getMonthlyReports();

  return (
    <div className="space-y-8">
      <ReportSummary reports={reports} />

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left text-slate-700">
                Empleado
              </th>

              <th className="p-4 text-center text-slate-700">
                Fichajes
              </th>

              <th className="p-4 text-center text-slate-700">
                Horas
              </th>

              <th className="p-4 text-center text-slate-700">
                Extra
              </th>

              <th className="p-4 text-center text-slate-700">
                Retrasos
              </th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr
                key={report.employeeId}
                className="border-b hover:bg-slate-50"
              >
                <td className="p-4 font-semibold text-slate-900">
                  {report.employee}
                </td>

                <td className="p-4 text-center text-slate-900">
                  {report.punches}
                </td>

                <td className="p-4 text-center text-slate-900">
                  {Math.floor(report.workedMinutes / 60)}h{" "}
                  {report.workedMinutes % 60}m
                </td>

                <td className="p-4 text-center font-semibold text-emerald-600">
                  {report.overtimeMinutes} min
                </td>

                <td className="p-4 text-center font-semibold text-red-600">
                  {report.lateMinutes} min
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}