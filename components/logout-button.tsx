"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
    >
      <LogOut size={18} />
      Cerrar sesión
    </button>
  );
}