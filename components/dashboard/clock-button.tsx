"use client";

import { useState } from "react";
import { Play, Square, Coffee } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createPunch } from "@/services/punches";

type Status =
  | "working"
  | "break"
  | "offline";

type Props = {
  status: Status;
  onPunchCreated: () => Promise<void>;
};

export function ClockButton({
  status,
  onPunchCreated,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function punch(type: any) {
    if (loading) return;

    try {
      setLoading(true);

      await createPunch(type);

      await onPunchCreated();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">

      {status === "working" && (

        <Button
          onClick={() => punch("break_start")}
          className="h-14 w-full rounded-3xl bg-orange-100 text-orange-700 hover:bg-orange-200"
        >
          <Coffee className="mr-2" size={20} />

          Iniciar descanso
        </Button>

      )}

      {status === "break" && (

        <Button
          onClick={() => punch("break_end")}
          className="h-14 w-full rounded-3xl bg-green-100 text-green-700 hover:bg-green-200"
        >
          <Play className="mr-2" size={20} />

          Reanudar trabajo
        </Button>

      )}

      <Button
        disabled={loading}
        onClick={() =>
          punch(
            status === "offline"
              ? "clock_in"
              : "clock_out"
          )
        }
        className={`h-16 w-full rounded-3xl text-lg font-bold ${
          status === "offline"
            ? "bg-violet-600 hover:bg-violet-700"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {status === "offline" ? (
          <>
            <Play className="mr-2" size={20} />

            Iniciar jornada
          </>
        ) : (
          <>
            <Square className="mr-2" size={20} />

            Finalizar jornada
          </>
        )}
      </Button>

    </div>
  );
}