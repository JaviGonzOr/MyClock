import { supabase } from "@/lib/supabase/client";
import { Punch, PunchEvent } from "@/types/punch";

export async function createPunch(eventType: PunchEvent) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Usuario no autenticado");

  const position = await new Promise<GeolocationPosition>(
    (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    }
  );

  const { error } = await supabase.from("punches").insert({
    user_id: user.id,
    event_type: eventType,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    accuracy: position.coords.accuracy,
  });

  if (error) throw new Error(error.message);
}

export async function getPunchesToday(): Promise<Punch[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const { data, error } = await supabase
    .from("punches")
    .select("*")
    .eq("user_id", user.id)
    .gte("created_at", start.toISOString())
    .lte("created_at", end.toISOString())
    .order("created_at");

  if (error) throw new Error(error.message);

  return (data ?? []) as Punch[];
}

export async function getLastPunch(): Promise<Punch | null> {
  const punches = await getPunchesToday();

  if (!punches.length) return null;

  return punches[punches.length - 1];
}

export async function getCurrentSessionStart(): Promise<Date | null> {
  const punches = await getPunchesToday();

  if (!punches.length) return null;

  const lastClockIn = [...punches]
    .reverse()
    .find((p) => p.event_type === "clock_in");

  if (!lastClockIn) return null;

  return new Date(lastClockIn.created_at);
}