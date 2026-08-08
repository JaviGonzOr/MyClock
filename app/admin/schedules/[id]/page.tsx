import { AdminHeader } from "@/components/admin/admin-header";
import { ScheduleDeleteButton } from "@/components/admin/schedule-delete-button";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: schedule, error } = await supabase
    .from("schedules")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("ERROR CARGANDO HORARIO:", error);

    return (
      <>
        <AdminHeader
          title="Error"
          subtitle="No se pudo cargar el horario"
        />

        <div className="p-8">
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-xl font-black text-red-700">
              Error al cargar el horario
            </h2>

            <p className="mt-3 text-red-600">
              {error.message}
            </p>
          </div>
        </div>
      </>
    );
  }

  if (!schedule) {
    return (
      <>
        <AdminHeader
          title="Horario no encontrado"
          subtitle="No se encontró el horario solicitado"
        />

        <div className="p-8">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="text-xl font-black text-amber-700">
              Horario no encontrado
            </h2>

            <p className="mt-3 text-amber-600">
              ID: {id}
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader
        title={schedule.name}
        subtitle="Detalle del horario"
      />

      <div className="p-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <h2 className="text-3xl font-black text-slate-900">
            {schedule.name}
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">

            <Day
              name="Lunes"
              start={schedule.monday_start}
              end={schedule.monday_end}
            />

            <Day
              name="Martes"
              start={schedule.tuesday_start}
              end={schedule.tuesday_end}
            />

            <Day
              name="Miércoles"
              start={schedule.wednesday_start}
              end={schedule.wednesday_end}
            />

            <Day
              name="Jueves"
              start={schedule.thursday_start}
              end={schedule.thursday_end}
            />

            <Day
              name="Viernes"
              start={schedule.friday_start}
              end={schedule.friday_end}
            />

            <Day
              name="Sábado"
              start={schedule.saturday_start}
              end={schedule.saturday_end}
            />

            <Day
              name="Domingo"
              start={schedule.sunday_start}
              end={schedule.sunday_end}
            />

          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">
              Descanso
            </p>

            <p className="mt-1 text-2xl font-black text-slate-900">
              {schedule.break_minutes} minutos
            </p>
          </div>

          <ScheduleDeleteButton id={schedule.id} />

        </div>
      </div>
    </>
  );
}

function Day({
  name,
  start,
  end,
}: {
  name: string;
  start: string | null;
  end: string | null;
}) {
  const libre = !start && !end;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-semibold text-slate-500">
        {name}
      </p>

      {libre ? (
        <p className="mt-1 text-xl font-black text-slate-400">
          Libre
        </p>
      ) : (
        <p className="mt-1 text-xl font-black text-slate-900">
          {start ?? "--:--"} → {end ?? "--:--"}
        </p>
      )}
    </div>
  );
}