import {
  Users,
  Clock3,
  Calendar,
  Fingerprint,
} from "lucide-react";

import { DashboardMetricCard } from "./dashboard-metric-card";
import { getDashboardMetrics } from "@/services/admin.service";

export async function DashboardMetrics() {
  const metrics =
    await getDashboardMetrics();

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <DashboardMetricCard
        title="Empleados"
        value={metrics.employees}
        subtitle="Registrados"
        icon={<Users size={30} />}
      />

      <DashboardMetricCard
        title="Trabajando"
        value={metrics.working}
        subtitle="Ahora mismo"
        icon={<Clock3 size={30} />}
      />

      <DashboardMetricCard
        title="Horarios"
        value={metrics.schedules}
        subtitle="Configurados"
        icon={<Calendar size={30} />}
      />

      <DashboardMetricCard
        title="Fichajes"
        value={metrics.punchesToday}
        subtitle="Realizados hoy"
        icon={<Fingerprint size={30} />}
      />

    </div>
  );
}