"use client";


import { Bell, Search } from "lucide-react";
import { UserMenu } from "@/components/user-menu";


type Props = {
  title: string;
  subtitle?: string;
};

export function AdminHeader({ title, subtitle }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex items-center justify-between px-8 py-5">
        <div>
          <h1 className="text-4xl font-black text-slate-900">{title}</h1>

          {subtitle && <p className="mt-2 text-slate-500">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              placeholder="Buscar..."
              className="w-72 rounded-2xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 outline-none transition focus:border-violet-500"
            />
          </div>

          <button className="rounded-2xl border border-slate-200 bg-white p-3 transition hover:bg-slate-100">
            <Bell size={20} className="text-slate-700" />
          </button>

          <UserMenu name="Administrador" subtitle="MyClock" />
        </div>
      </div>
    </header>
  );
}
