import {
  Clock3,
  LogIn,
  LogOut,
  Coffee,
} from "lucide-react";

import { StatCard } from "@/components/ui/stat-card";

type Props = {
  firstClockIn?: string;
  lastClockOut?: string;
  workedTime?: string;
  breaks?: number;
};

export function DashboardSummary({
  firstClockIn = "--:--",
  lastClockOut = "--:--",
  workedTime = "00:00",
  breaks = 0,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">

      <StatCard
        title="Entrada"
        value={firstClockIn}
        icon={<LogIn size={22} />}
      />

      <StatCard
        title="Salida"
        value={lastClockOut}
        icon={<LogOut size={22} />}
      />

      <StatCard
        title="Horas"
        value={workedTime}
        icon={<Clock3 size={22} />}
      />

      <StatCard
        title="Descansos"
        value={breaks.toString()}
        icon={<Coffee size={22} />}
      />

    </div>
  );
}