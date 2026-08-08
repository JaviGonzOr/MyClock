"use client";

import { useState } from "react";
import {
  Clock,
  LogIn,
  LogOut,
  Coffee,
  Pencil,
  Trash2,
  Plus,
  X,
  Save,
} from "lucide-react";

import { supabase } from "@/lib/supabase/client";
import { Punch, PunchEvent } from "@/types/punch";

type Props = {
  punches: Punch[];
  employeeId: string;
};

const eventLabels: Record<PunchEvent, string> = {
  clock_in: "Entrada",
  clock_out: "Salida",
  break_start: "Inicio descanso",
  break_end: "Fin descanso",
};

export function EmployeeHistory({
  punches,
  employeeId,
}: Props) {
  const [items, setItems] = useState<Punch[]>(
    [...punches].sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
  );

  const [editing, setEditing] =
    useState<Punch | null>(null);

  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [error, setError] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [eventType, setEventType] =
    useState<PunchEvent>("clock_in");

  function formatDateTime(
    createdAt: string
  ) {
    const dateObject = new Date(createdAt);

    const year =
      dateObject.getFullYear();

    const month = String(
      dateObject.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      dateObject.getDate()
    ).padStart(2, "0");

    const hours = String(
      dateObject.getHours()
    ).padStart(2, "0");

    const minutes = String(
      dateObject.getMinutes()
    ).padStart(2, "0");

    return {
      date: `${year}-${month}-${day}`,
      time: `${hours}:${minutes}`,
    };
  }

  function openEdit(punch: Punch) {
    const values = formatDateTime(
      punch.created_at
    );

    setDate(values.date);
    setTime(values.time);
    setEventType(punch.event_type);

    setEditing(punch);
    setAdding(false);
    setError("");
  }

  function openAdd() {
    const now = new Date();

    const values = formatDateTime(
      now.toISOString()
    );

    setDate(values.date);
    setTime(values.time);
    setEventType("clock_in");

    setAdding(true);
    setEditing(null);
    setError("");
  }

  function closeForm() {
    setAdding(false);
    setEditing(null);
    setError("");
  }

  async function save() {
    if (!date || !time) {
      setError(
        "Debes indicar fecha y hora."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      const createdAt = new Date(
        `${date}T${time}:00`
      ).toISOString();

      if (editing) {
        const { error } =
          await supabase
            .from("punches")
            .update({
              event_type: eventType,
              created_at: createdAt,
            })
            .eq("id", editing.id);

        if (error) {
          throw error;
        }

        setItems((current) =>
          current
            .map((item) =>
              item.id === editing.id
                ? {
                    ...item,
                    event_type: eventType,
                    created_at: createdAt,
                  }
                : item
            )
            .sort(
              (a, b) =>
                new Date(
                  b.created_at
                ).getTime() -
                new Date(
                  a.created_at
                ).getTime()
            )
        );

        closeForm();
        return;
      }

      const userId = employeeId;

      const newId =
        crypto.randomUUID();

      const newPunch: Punch = {
        id: newId,
        user_id: userId,
        event_type: eventType,
        latitude: null,
        longitude: null,
        accuracy: null,
        created_at: createdAt,
      };

      const { error } =
        await supabase
          .from("punches")
          .insert({
            id: newId,
            user_id: userId,
            event_type: eventType,
            latitude: null,
            longitude: null,
            accuracy: null,
            created_at: createdAt,
          });

      if (error) {
        throw error;
      }

      setItems((current) =>
        [
          ...current,
          newPunch,
        ].sort(
          (a, b) =>
            new Date(
              b.created_at
            ).getTime() -
            new Date(
              a.created_at
            ).getTime()
        )
      );

      closeForm();
    } catch (error: any) {
      console.error(
        "ERROR GUARDANDO FICHAJE:",
        error
      );

      setError(
        error?.message ||
          error?.details ||
          "No se pudo guardar el fichaje."
      );
    } finally {
      setLoading(false);
    }
  }

  async function deletePunch(
    id: string
  ) {
    console.log(
      "BOTÓN BORRAR PULSADO:",
      id
    );

    try {
      setDeletingId(id);
      setError("");

      console.log(
        "ELIMINANDO FICHAJE:",
        id
      );

      const { error } =
        await supabase
          .from("punches")
          .delete()
          .eq("id", id);

      if (error) {
        console.error(
          "ERROR DELETE:",
          error
        );

        throw error;
      }

      console.log(
        "FICHAJE ELIMINADO:",
        id
      );

      setItems((current) =>
        current.filter(
          (item) => item.id !== id
        )
      );
    } catch (error: any) {
      console.error(
        "ERROR ELIMINANDO FICHAJE:",
        error
      );

      console.error(
        "MESSAGE:",
        error?.message
      );

      console.error(
        "CODE:",
        error?.code
      );

      console.error(
        "DETAILS:",
        error?.details
      );

      console.error(
        "HINT:",
        error?.hint
      );

      setError(
        error?.message ||
          error?.details ||
          error?.hint ||
          "No se pudo eliminar el fichaje."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-slate-200 p-6">

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Historial de fichajes
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Corrección manual de fichajes
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
        >
          <Plus size={18} />
          Añadir fichaje
        </button>

      </div>

      {error && (
        <div className="border-b border-red-200 bg-red-50 px-6 py-4">
          <p className="font-semibold text-red-700">
            {error}
          </p>
        </div>
      )}

      {(adding || editing) && (
        <div className="border-b border-slate-200 bg-slate-50 p-6">

          <div className="flex items-center justify-between">

            <h3 className="text-lg font-bold text-slate-900">
              {editing
                ? "Editar fichaje"
                : "Nuevo fichaje"}
            </h3>

            <button
              type="button"
              onClick={closeForm}
              disabled={loading}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-200"
            >
              <X size={20} />
            </button>

          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Fecha
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                disabled={loading}
                className="w-full rounded-xl border border-slate-300 bg-white p-3 font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Hora
              </label>

              <input
                type="time"
                value={time}
                onChange={(e) =>
                  setTime(e.target.value)
                }
                disabled={loading}
                className="w-full rounded-xl border border-slate-300 bg-white p-3 font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Tipo
              </label>

              <select
                value={eventType}
                onChange={(e) =>
                  setEventType(
                    e.target.value as PunchEvent
                  )
                }
                disabled={loading}
                className="w-full rounded-xl border border-slate-300 bg-white p-3 font-semibold text-slate-900"
              >
                <option value="clock_in">
                  Entrada
                </option>

                <option value="clock_out">
                  Salida
                </option>

                <option value="break_start">
                  Inicio descanso
                </option>

                <option value="break_end">
                  Fin descanso
                </option>
              </select>
            </div>

          </div>

          <div className="mt-5 flex gap-3">

            <button
              type="button"
              onClick={save}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              <Save size={18} />

              {loading
                ? "Guardando..."
                : "Guardar"}
            </button>

            <button
              type="button"
              onClick={closeForm}
              disabled={loading}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancelar
            </button>

          </div>

        </div>
      )}

      <div className="divide-y divide-slate-100">

        {items.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            Sin fichajes
          </div>
        )}

        {items.map((punch) => (
          <div
            key={punch.id}
            className="flex items-center justify-between p-5"
          >

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-slate-100 p-3">

                {punch.event_type ===
                  "clock_in" && (
                  <LogIn className="text-green-600" />
                )}

                {punch.event_type ===
                  "clock_out" && (
                  <LogOut className="text-red-600" />
                )}

                {punch.event_type ===
                  "break_start" && (
                  <Coffee className="text-orange-500" />
                )}

                {punch.event_type ===
                  "break_end" && (
                  <Clock className="text-violet-600" />
                )}

              </div>

              <div>

                <p className="font-semibold text-slate-900">
                  {eventLabels[
                    punch.event_type
                  ]}
                </p>

                <p className="text-sm text-slate-500">
                  {new Date(
                    punch.created_at
                  ).toLocaleString(
                    "es-ES"
                  )}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={() =>
                  openEdit(punch)
                }
                disabled={loading}
                className="rounded-xl p-3 text-slate-500 hover:bg-slate-100 hover:text-violet-600 disabled:opacity-40"
                title="Editar fichaje"
              >
                <Pencil size={18} />
              </button>

              <button
                type="button"
                onClick={() =>
                  deletePunch(punch.id)
                }
                disabled={
                  deletingId !== null
                }
                className="rounded-xl p-3 text-red-500 hover:bg-red-50 hover:text-red-700 disabled:opacity-40"
                title="Eliminar fichaje"
              >
                {deletingId ===
                punch.id ? (
                  <span className="text-xs font-bold">
                    ...
                  </span>
                ) : (
                  <Trash2 size={18} />
                )}
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}