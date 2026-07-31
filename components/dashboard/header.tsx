"use client";


import { UserMenu } from "@/components/user-menu";

type HeaderProps = {
  name: string;
};

export function Header({ name }: HeaderProps) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Buenos días" : hour < 20 ? "Buenas tardes" : "Buenas noches";

  const date = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <header className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#5A4763] via-[#6C5476] to-[#8B5CF6] p-6 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.25),transparent_45%)]" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-white/80 capitalize">
            {date}
          </p>

          <h1 className="mt-3 text-4xl font-black leading-none text-white">
            {greeting}
          </h1>

          <p className="mt-2 text-xl font-semibold text-white/95">{name}</p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />

            <span className="text-sm font-semibold text-white">EN JORNADA</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-[28px] border border-white/20 bg-white/15 shadow-lg backdrop-blur-xl">
            <span className="text-3xl font-black text-white">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>

          <UserMenu name={name} subtitle="Empleado" />
        </div>
      </div>
    </header>
  );
}
