"use client";

import { ReactNode } from "react";
import { BottomNav } from "./bottom-nav";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        <main className="flex-1 p-6 pb-24">
          {children}
        </main>

        <BottomNav />
      </div>
    </div>
  );
}