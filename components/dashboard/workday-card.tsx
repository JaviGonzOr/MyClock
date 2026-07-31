import { WorkdayResult } from "@/services/workday.service";

type Props = {
  result: WorkdayResult;
};

export function WorkdayCard({
  result,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Resumen de jornada
      </h2>

      <div className="grid grid-cols-2 gap-5">

        <Item
          title="Entrada"
          value={`${result.realStart} / ${result.expectedStart}`}
        />

        <Item
          title="Salida"
          value={`${result.realEnd} / ${result.expectedEnd}`}
        />

        <Item
          title="Retraso"
          value={`${result.lateMinutes} min`}
        />

        <Item
          title="Horas extra"
          value={`${result.overtimeMinutes} min`}
        />

        <Item
          title="Salida antes"
          value={`${result.earlyLeaveMinutes} min`}
        />

        <Item
          title="Trabajado"
          value={`${Math.floor(
            result.workedMinutes / 60
          )}h ${result.workedMinutes % 60}m`}
        />

      </div>

    </div>
  );
}

function Item({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-xl font-bold text-slate-900">
        {value}
      </p>

    </div>
  );
}