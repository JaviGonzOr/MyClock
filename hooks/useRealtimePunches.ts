"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

type Props = {
  onChange: () => void;
};

export function useRealtimePunches({
  onChange,
}: Props) {
  useEffect(() => {
    const channel = supabase
      .channel("punches-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "punches",
        },
        () => {
          onChange();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [onChange]);
}