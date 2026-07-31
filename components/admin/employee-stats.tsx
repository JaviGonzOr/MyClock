"use client";

import {
  Clock3,
  Calendar,
  Fingerprint,
} from "lucide-react";

type Props = {
  workedToday: string;
  workedMonth: string;
  punchesToday: number;
  lastPunch: string;
};

export function EmployeeStats({
  workedToday,
  workedMonth,
  punchesToday,
  lastPunch,
}: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-2">

      <Card
        title="Hoy"
        value={workedToday}
        icon={<Clock3 size={22} />}
      />

      <Card
        title="Este mes"
        value={workedMonth}
        icon={<Calendar size={22} />}
      />

      <Card
        title="Fichajes hoy"
        value={punchesToday.toString()}
        icon={<Fingerprint size={22} />}
      />

      <Card
        title="Último fichaje"
        value={lastPunch}
        icon={<Clock3 size={22} />}
      />

    </div>
  );
}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex justify-between">

        <div>

          <p className="text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-900">
            {value}
          </h2>

        </div>

        <div className="rounded-2xl bg-violet-100 p-4 text-violet-700">
          {icon}
        </div>

      </div>

    </div>
  );
}