import { ReactNode } from "react";

import { AdminSidebar } from "./admin-sidebar";

export function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <AdminSidebar />

      <main className="flex-1 overflow-auto">

        {children}

      </main>

    </div>
  );
}