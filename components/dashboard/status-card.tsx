import { AppCard } from "@/components/ui/app-card";

type Props = {
  status: "working" | "break" | "offline";
  lastPunchTime?: string;
};

export function StatusCard({
  status,
  lastPunchTime,
}: Props) {
  const config = {
    working: {
      dot: "bg-emerald-500",
      title: "Jornada activa",
      subtitle: "Todo correcto. Continúa trabajando.",
      state: "Trabajando",
    },

    break: {
      dot: "bg-orange-500",
      title: "En descanso",
      subtitle: "Tu jornada está pausada.",
      state: "Descanso",
    },

    offline: {
      dot: "bg-red-500",
      title: "Sin iniciar jornada",
      subtitle: "Pulsa el botón para empezar.",
      state: "Fuera",
    },
  };

  const current = config[status];

  return (
    <AppCard>
      <div className="flex items-center gap-3">

        <div
          className={`h-3.5 w-3.5 rounded-full ${current.dot}`}
        />

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            {current.title}
          </h2>

          <p className="text-slate-500">
            {current.subtitle}
          </p>

        </div>

      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">

        <div>

          <p className="text-sm text-slate-500">
            Último fichaje
          </p>

          <p className="mt-1 text-xl font-semibold text-slate-900">
            {lastPunchTime ?? "--:--"}
          </p>

        </div>

        <div>

          <p className="text-sm text-slate-500">
            Estado
          </p>

          <p className="mt-1 text-xl font-semibold text-slate-900">
            {current.state}
          </p>

        </div>

      </div>

    </AppCard>
  );
}