import { MonthlyReport } from "@/types/report";

type Props = {
  reports: MonthlyReport[];
};

export function ReportSummary({
  reports,
}: Props) {
  const employees =
    reports.length;

  const punches =
    reports.reduce(
      (a, b) => a + b.punches,
      0
    );

  const worked =
    reports.reduce(
      (a, b) => a + b.workedMinutes,
      0
    );

  const overtime =
    reports.reduce(
      (a, b) => a + b.overtimeMinutes,
      0
    );

  return (
    <div className="grid gap-5 md:grid-cols-4">

      <Card
        title="Empleados"
        value={employees.toString()}
      />

      <Card
        title="Fichajes"
        value={punches.toString()}
      />

      <Card
        title="Horas"
        value={`${Math.floor(
          worked / 60
        )}h`}
      />

      <Card
        title="Extra"
        value={`${overtime} min`}
      />

    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <p className="text-slate-500">
        {title}
      </p>

      <h2 className="mt-2 text-4xl font-black text-slate-900">
        {value}
      </h2>

    </div>
  );
}