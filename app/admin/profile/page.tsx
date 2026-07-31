import { ProfileForm } from "@/components/profile/profile-form";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6 lg:p-10">
      <div className="mx-auto mb-8 max-w-5xl">
        <h1 className="text-4xl font-bold text-slate-900">
          Mi perfil
        </h1>

        <p className="mt-2 text-slate-500">
          Gestiona tu información personal y la seguridad de tu cuenta.
        </p>
      </div>

      <ProfileForm />
    </main>
  );
}