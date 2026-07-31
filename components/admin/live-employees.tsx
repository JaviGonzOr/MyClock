import Image from "next/image";

import {
  getLiveEmployees,
} from "@/services/live-dashboard.service";

export async function LiveEmployees() {
  const employees =
    await getLiveEmployees();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b p-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Estado de empleados
        </h2>

      </div>

      <div className="divide-y">

        {employees.map((employee) => {

          const badge =
            employee.working
              ? {
                  text: "Trabajando",
                  className:
                    "bg-green-100 text-green-700",
                }
              : {
                  text: "Fuera",
                  className:
                    "bg-slate-100 text-slate-700",
                };

          return (

            <div
              key={employee.id}
              className="flex items-center justify-between p-5"
            >

              <div className="flex items-center gap-4">

                <Image
                  src={
                    employee.avatar_url ??
                    "/avatar-placeholder.png"
                  }
                  alt=""
                  width={52}
                  height={52}
                  className="rounded-full"
                />

                <div>

                  <p className="font-semibold text-slate-900">
                    {employee.full_name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {employee.lastPunch
                      ? new Date(
                          employee.lastPunch
                        ).toLocaleString("es-ES")
                      : "Sin fichajes"}
                  </p>

                </div>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${badge.className}`}
              >
                {badge.text}
              </span>

            </div>

          );

        })}

      </div>

    </div>
  );
}