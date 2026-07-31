import { createClient } from "@/lib/supabase/server";

function eventLabel(event: string) {
  switch (event) {
    case "clock_in":
      return {
        text: "Entrada",
        className:
          "bg-green-100 text-green-700",
      };

    case "clock_out":
      return {
        text: "Salida",
        className:
          "bg-red-100 text-red-700",
      };

    case "break_start":
      return {
        text: "Inicio descanso",
        className:
          "bg-amber-100 text-amber-700",
      };

    case "break_end":
      return {
        text: "Fin descanso",
        className:
          "bg-blue-100 text-blue-700",
      };

    default:
      return {
        text: event,
        className:
          "bg-slate-100 text-slate-700",
      };
  }
}

export async function RecentPunches() {
  const supabase = await createClient();

  const [punchesResult, profilesResult] =
    await Promise.all([
      supabase
        .from("punches")
        .select("*")
        .order("created_at", {
          ascending: false,
        })
        .limit(10),

      supabase
        .from("profiles")
        .select(
          "id,full_name,avatar_url"
        ),
    ]);

  if (punchesResult.error)
    throw punchesResult.error;

  if (profilesResult.error)
    throw profilesResult.error;

  const profileMap = new Map<
    string,
    {
      full_name: string;
      avatar_url: string | null;
    }
  >();

  for (const profile of profilesResult.data ??
    []) {
    profileMap.set(profile.id, profile);
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Últimos fichajes
        </h2>

      </div>

      <div className="divide-y">

        {(punchesResult.data ?? []).map(
          (row) => {
            const profile =
              profileMap.get(row.user_id);

            const badge =
              eventLabel(
                row.event_type
              );

            return (
              <div
                key={row.id}
                className="flex items-center justify-between p-5"
              >
                <div className="flex items-center gap-4">

                  <img
                    src={
                      profile?.avatar_url ??
                      "/mi_logo.png"
                    }
                    className="h-12 w-12 rounded-full object-cover"
                    alt=""
                  />

                  <div>

                    <p className="font-semibold text-slate-900">
                      {profile?.full_name ??
                        "Empleado"}
                    </p>

                    <p className="text-sm text-slate-500">
                      {new Date(
                        row.created_at
                      ).toLocaleString(
                        "es-ES"
                      )}
                    </p>

                  </div>

                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${badge.className}`}
                >
                  {badge.text}
                </span>

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}