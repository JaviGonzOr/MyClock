"use client";

import { useEffect, useState } from "react";
import { User, Shield, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Profile = {
  id: string;
  full_name: string;
  email: string;
  role: string;
};

export function ProfileForm() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, email, role")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setProfile(data);
    setName(data.full_name ?? "");

    setLoading(false);
  }

  async function saveProfile() {
    if (!profile) return;

    setSaving(true);
    setMessage("");

    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        full_name: name,
      })
      .eq("id", profile.id);

    if (profileError) {
      setMessage(profileError.message);
      setSaving(false);
      return;
    }

    if (password.length > 0) {
      if (password !== confirmPassword) {
        setMessage("Las contraseñas no coinciden.");
        setSaving(false);
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setMessage(error.message);
        setSaving(false);
        return;
      }
    }

    setMessage("✅ Perfil actualizado correctamente.");

    setPassword("");
    setConfirmPassword("");
    setSaving(false);

    setTimeout(() => {
      router.push("/admin");
      router.refresh();
    }, 1000);
  }

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">Cargando perfil...</div>
    );
  }

  if (!profile) {
    return (
      <div className="py-20 text-center text-red-600">
        No se pudo cargar el perfil.
      </div>
    );
  }

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle>Mi perfil</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-violet-100">
            <User size={52} className="text-violet-700" />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              {profile.full_name}
            </h2>

            <p className="mt-1 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700">
              <Shield size={15} />
              {profile.role}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <Label>Nombre</Label>

            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <Label>Correo electrónico</Label>

            <div className="relative">
              <Mail
                className="absolute left-3 top-3 text-slate-400"
                size={18}
              />

              <Input className="pl-10" value={profile.email} disabled />
            </div>
          </div>

          <div>
            <Label>Nueva contraseña</Label>

            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <Label>Confirmar contraseña</Label>

            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {message && (
            <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-700">
              {message}
            </div>
          )}

          <Button type="button" onClick={saveProfile} disabled={saving}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
