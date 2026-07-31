"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      setError("No se pudo obtener el usuario.");
      return;
    }

    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select("id, role")
      .eq("id", user.id)
      .single();

    console.log("========== LOGIN ==========");
    console.log("USER:", user);
    console.log("USER ID:", user.id);
    console.log("PROFILE:", profile);
    console.log("PROFILE ERROR:", profileError);
    console.log("ROLE:", profile?.role);
    console.log("===========================");

    setLoading(false);

    if (profileError || !profile) {
      setError("No se encontró el perfil.");
      return;
    }

    if (profile.role === "admin") {
      console.log("➡️ ADMIN");
      router.refresh();
      router.replace("/admin");
    } else {
      console.log("➡️ EMPLOYEE");
      router.refresh();
      router.replace("/dashboard");
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="email">
          Correo electrónico
        </Label>

        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          Contraseña
        </Label>

        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading
          ? "Entrando..."
          : "Iniciar sesión"}
      </Button>
    </form>
  );
}