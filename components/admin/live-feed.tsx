"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type FeedEvent = {
  id: string;
  created_at: string;
  event_type: string;
  user_id: string;
};

export function LiveFeed() {
  const [events, setEvents] = useState<FeedEvent[]>([]);

  async function load() {
    const { data, error } = await supabase
      .from("punches")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(10);

    if (error) {
      console.error(error);
      return;
    }

    setEvents((data ?? []) as FeedEvent[]);
  }

  useEffect(() => {
    load();

    const channel = supabase
      .channel("admin-feed")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "punches",
        },
        () => {
          load();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const labels = {
    clock_in: {
      icon: "🟢",
      text: "Inicio de jornada",
    },
    clock_out: {
      icon: "🔴",
      text: "Fin de jornada",
    },
    break_start: {
      icon: "☕",
      text: "Inicio de descanso",
    },
    break_end: {
      icon: "▶️",
      text: "Fin del descanso",
    },
  } as const;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-2xl font-bold text-slate-900">
        Actividad reciente
      </h2>

      <div className="mt-6 space-y-3">

        {events.length === 0 && (
          <p className="text-slate-500">
            Todavía no hay actividad.
          </p>
        )}

        {events.map((event) => {
          const current =
            labels[
              event.event_type as keyof typeof labels
            ];

          return (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-center gap-3">

                <span className="text-2xl">
                  {current.icon}
                </span>

                <div>

                  <p className="font-semibold text-slate-900">
                    {current.text}
                  </p>

                  <p className="text-sm text-slate-500">
                    Usuario: {event.user_id.slice(0, 8)}...
                  </p>

                </div>

              </div>

              <div className="text-right">

                <p className="font-semibold text-slate-900">
                  {new Date(event.created_at).toLocaleTimeString(
                    "es-ES",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>

                <p className="text-xs text-slate-500">
                  {new Date(event.created_at).toLocaleDateString(
                    "es-ES"
                  )}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}