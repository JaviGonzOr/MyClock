import { AdminHeader } from "@/components/admin/admin-header";
import { DashboardGrid } from "@/components/admin/dashboard-grid";

export default function AdminPage() {
  return (
    <>
      <AdminHeader
        title="Panel de administración"
        subtitle="Resumen general"
      />

      <div className="p-8">

        <DashboardGrid />

      </div>

    </>
  );
}