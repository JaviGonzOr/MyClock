"use client";

import { use } from "react";
import {
  Clock3,
  Coffee,
  LogIn,
  LogOut,
} from "lucide-react";

export default function DayPage({
  params,
}: {
  params: Promise<{
    date: string;
  }>;
}) {
  const { date } = use(params);

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="mx-auto max-w-5xl space-y-6">

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <h1 className="text-4xl font-black text-slate-900">
            Jornada
          </h1>

          <p className="mt-2 text-slate-500">
            {date}
          </p>

        </div>

        <div className="grid gap-4 md:grid-cols-4">

          <Card
            title="Entrada"
            value="08:01"
            icon={<LogIn size={22} />}
            color="green"
          />

          <Card
            title="Salida"
            value="17:03"
            icon={<LogOut size={22} />}
            color="red"
          />

          <Card
            title="Horas"
            value="08:24"
            icon={<Clock3 size={22} />}
            color="violet"
          />

          <Card
            title="Descansos"
            value="00:31"
            icon={<Coffee size={22} />}
            color="orange"
          />

        </div>

      </div>

    </main>
  );
}

function Card({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color:
    | "green"
    | "red"
    | "orange"
    | "violet";
}) {
  const colors = {
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    orange: "bg-orange-100 text-orange-700",
    violet: "bg-violet-100 text-violet-700",
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-black text-slate-900">
            {value}
          </h2>

        </div>

        <div
          className={`rounded-2xl p-4 ${colors[color]}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}