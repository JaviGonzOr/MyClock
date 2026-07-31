import { MonthlyReport } from "@/types/report";

export function exportCSV(
  reports: MonthlyReport[]
) {

  const rows = [

    [
      "Empleado",
      "Horas",
      "Extra",
      "Retrasos",
      "Fichajes"
    ],

  ];

  reports.forEach(r=>{

    rows.push([

      r.employee,

      (
        r.workedMinutes/60
      ).toFixed(2),

      r.overtimeMinutes.toString(),

      r.lateMinutes.toString(),

      r.punches.toString()

    ]);

  });

  const csv =
    rows
      .map(r=>r.join(";"))
      .join("\n");

  const blob =
    new Blob(
      [csv],
      {
        type:"text/csv"
      }
    );

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href=url;

  a.download="informe.csv";

  a.click();

}