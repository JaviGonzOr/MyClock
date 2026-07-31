import { SettingsForm } from "@/components/settings/settings-form";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6 lg:p-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-slate-900">
          Ajustes
        </h1>

        <p className="mt-2 mb-8 text-slate-500">
          Configuración general de MyClock.
        </p>

        <SettingsForm />
      </div>
    </main>
  );
}