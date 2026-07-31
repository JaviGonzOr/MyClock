"use client";

import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import { AppCard } from "@/components/ui/app-card";

type Props = {
  working: boolean;
  startTime: Date | null;
};

function format(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return [h, m, s]
    .map((v) => v.toString().padStart(2, "0"))
    .join(":");
}

export function LiveTimer({
  working,
  startTime,
}: Props) {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    if (!working || !startTime) {
      setTime("00:00:00");
      return;
    }

    const update = () => {
      const diff = Math.floor(
        (Date.now() - startTime.getTime()) / 1000
      );

      setTime(format(diff));
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [working, startTime]);

  return (
    <AppCard>
      <div className="flex items-start justify-between gap-5">

        <div className="min-w-0 flex-1">

          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
            Tiempo trabajado
          </p>

          <h1 className="mt-3 text-[54px] font-black leading-none tracking-tight text-slate-900">
            {time}
          </h1>

          <p className="mt-4 text-sm text-slate-500">
            {working
              ? "Cronómetro en tiempo real"
              : "Esperando inicio de jornada"}
          </p>

        </div>

        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] bg-orange-100 border border-orange-200">

          <Timer
            size={38}
            className="text-orange-600"
          />

        </div>

      </div>
    </AppCard>
  );
}