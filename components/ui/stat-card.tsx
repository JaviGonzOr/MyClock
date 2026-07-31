import { ReactNode } from "react";
import { AppCard } from "@/components/ui/app-card";

type Props = {
  title: string;
  value: string;
  icon: ReactNode;
};

export function StatCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <AppCard>
      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs uppercase tracking-wider text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-black text-slate-900">
            {value}
          </h2>

        </div>

        <div className="rounded-2xl bg-orange-100 p-4 text-orange-600">
          {icon}
        </div>

      </div>
    </AppCard>
  );
}