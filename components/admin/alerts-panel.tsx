import {
  AlertCircle,
  Clock3,
  Coffee,
  TriangleAlert,
} from "lucide-react";

import { getAlerts } from "@/services/alerts.service";

export async function AlertsPanel() {
  const alerts = await getAlerts();

  if (alerts.length === 0) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-100 p-2">
            <TriangleAlert
              size={20}
              className="text-emerald-700"
            />
          </div>

          <div>
            <h2 className="font-bold text-emerald-900">
              Sin alertas
            </h2>

            <p className="text-sm text-emerald-700">
              Todo funciona correctamente.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-orange-200 bg-white shadow-sm">
      <div className="border-b border-orange-100 bg-orange-50 p-6">
        <h2 className="text-xl font-bold text-orange-900">
          Alertas
        </h2>

        <p className="mt-1 text-sm text-orange-700">
          {alerts.length} alerta{alerts.length !== 1 ? "s" : ""} activa{alerts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {alerts.map((alert) => {
          let icon = (
            <TriangleAlert
              size={18}
              className="text-orange-700"
            />
          );

          let iconBackground =
            "bg-orange-100";

          switch (alert.type) {
            case "missing":
              icon = (
                <AlertCircle
                  size={18}
                  className="text-red-700"
                />
              );
              iconBackground =
                "bg-red-100";
              break;

            case "working":
              icon = (
                <Coffee
                  size={18}
                  className="text-amber-700"
                />
              );
              iconBackground =
                "bg-amber-100";
              break;

            case "overtime":
              icon = (
                <Clock3
                  size={18}
                  className="text-violet-700"
                />
              );
              iconBackground =
                "bg-violet-100";
              break;
          }

          return (
            <div
              key={alert.id}
              className="flex items-start gap-4 p-5"
            >
              <div
                className={`mt-1 rounded-xl p-2 ${iconBackground}`}
              >
                {icon}
              </div>

              <div className="flex-1">
                <p className="font-semibold text-slate-900">
                  {alert.employee}
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {alert.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}