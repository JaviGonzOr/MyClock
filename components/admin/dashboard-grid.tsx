import { DashboardMetrics } from "./dashboard-metrics";
import { QuickActions } from "./quick-actions";
import { AlertsPanel } from "./alerts-panel";
import { LiveEmployees } from "./live-employees";
import { RecentPunches } from "./recent-punches";

export async function DashboardGrid() {
  return (
    <div className="space-y-8">

      <DashboardMetrics />

      <QuickActions />

      <AlertsPanel />

      <div className="grid gap-8 xl:grid-cols-2">

        <RecentPunches />

        <LiveEmployees />

      </div>

    </div>
  );
}