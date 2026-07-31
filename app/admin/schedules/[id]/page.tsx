import { notFound } from "next/navigation";

import { scheduleService } from "@/services/schedule.service";

import { AdminHeader } from "@/components/admin/admin-header";

export default async function SchedulePage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const schedule =
    await scheduleService.get(id);

  if (!schedule) {
    notFound();
  }

  return (
    <>
      <AdminHeader
        title={schedule.name}
        subtitle="Editar horario"
      />

      <div className="p-8">

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <pre className="overflow-auto text-sm text-slate-700">
            {JSON.stringify(
              schedule,
              null,
              2
            )}
          </pre>

        </div>

      </div>

    </>
  );
}