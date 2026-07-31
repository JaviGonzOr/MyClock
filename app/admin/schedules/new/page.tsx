import { AdminHeader } from "@/components/admin/admin-header";
import { ScheduleForm } from "@/components/admin/schedule-form";

export default function NewSchedulePage() {
  return (
    <>
      <AdminHeader
        title="Nuevo horario"
        subtitle="Crear horario laboral"
      />

      <div className="p-8">

        <div className="mx-auto max-w-5xl">

          <ScheduleForm />

        </div>

      </div>

    </>
  );
}
