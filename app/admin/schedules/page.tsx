import Link from "next/link";
import { Plus } from "lucide-react";

import { AdminHeader } from "@/components/admin/admin-header";
import { SchedulesList } from "@/components/admin/schedules-list";

export default function SchedulesPage() {
  return (
    <>
      <AdminHeader
        title="Horarios"
        subtitle="Gestiona los horarios de trabajo"
      />

      <div className="p-8">

        <div className="mb-8 flex justify-end">

          <Link
            href="/admin/schedules/new"
            className="rounded-2xl bg-violet-600 px-5 py-3 font-semibold text-white"
          >
            <Plus
              className="mr-2 inline"
              size={18}
            />

            Nuevo horario

          </Link>

        </div>

        <SchedulesList />

      </div>

    </>
  );
}