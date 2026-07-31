"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  History,
  User,
  ChartColumn,
} from "lucide-react";

const items = [
  {
    href: "/dashboard",
    label: "Inicio",
    icon: House,
  },
  {
    href: "/history",
    label: "Historial",
    icon: History,
  },
  {
    href: "/profile",
    label: "Perfil",
    icon: User,
  },
  {
    href: "/settings",
    label: "Ajustes",
    icon: ChartColumn,
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white">
      <div className="mx-auto flex max-w-md justify-around py-3">
        {items.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-xs transition-colors ${
                active
                  ? "text-blue-600"
                  : "text-slate-500"
              }`}
            >
              <Icon size={22} />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}