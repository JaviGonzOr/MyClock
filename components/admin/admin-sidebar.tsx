"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  LayoutDashboard,
  Users,
  Clock3,
  FileText,
} from "lucide-react";

const items = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/employees",
    label: "Empleados",
    icon: Users,
  },
  {
    href: "/admin/schedules",
    label: "Horarios",
    icon: Clock3,
  },
  {
    href: "/admin/reports",
    label: "Informes",
    icon: FileText,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-72 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-8">
        <Image
          src="/mi_logo.png"
          alt="MyClock"
          width={150}
          height={150}
          className="mx-auto"
        />
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {items.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold transition ${
                active
                  ? "bg-violet-100 text-violet-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-6">
        <div className="rounded-2xl bg-slate-100 p-4">
          <p className="font-bold text-slate-900">
            MyClock v1.0
          </p>

          <p className="text-sm text-slate-500">
            Sistema listo
          </p>
        </div>
      </div>
    </aside>
  );
}