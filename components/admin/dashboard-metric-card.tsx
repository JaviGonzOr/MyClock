import { ReactNode } from "react";

type Props = {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle?: string;
};

export function DashboardMetricCard({
  title,
  value,
  icon,
  subtitle,
}: Props) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-100 opacity-40 transition duration-500 group-hover:scale-125" />

      <div className="relative flex items-start justify-between">

        <div className="flex-1">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-5xl font-black tracking-tight text-slate-900">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-4 text-sm text-slate-500">
              {subtitle}
            </p>
          )}

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg">

          {icon}

        </div>

      </div>
    </div>
  );
}