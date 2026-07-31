"use client";

import { useEffect, useState } from "react";
import { Building2, Clock3, Palette, ShieldCheck, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Settings = {
  id: string;
  company_name: string;
  company_logo: string | null;
  timezone: string;
  working_hours: number;
  primary_color: string;
};

export function SettingsForm() {
  const router = useRouter();

  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .single();

    if (!error && data) {
      setSettings(data);
    }
  }

  async function saveSettings() {
    if (!settings) return;

    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("settings")
      .update({
        company_name: settings.company_name,
        company_logo: settings.company_logo,
        timezone: settings.timezone,
        working_hours: settings.working_hours,
        primary_color: settings.primary_color,
        updated_at: new Date().toISOString(),
      })
      .eq("id", settings.id);

    if (error) {
      setMessage("❌ Error al guardar");
      setSaving(false);
      return;
    }

    setMessage("✅ Ajustes guardados correctamente.");

    setSaving(false);

    setTimeout(() => {
      router.push("/admin");
      router.refresh();
    }, 1000);
  }

  if (!settings) {
    return (
      <div className="rounded-xl bg-white p-10 text-center">
        Cargando ajustes...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <Building2 className="text-violet-600" />
          <CardTitle>Empresa</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div>
            <Label>Nombre de la empresa</Label>

            <Input
              value={settings.company_name}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  company_name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Logo</Label>

            <Input
              value={settings.company_logo ?? ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  company_logo: e.target.value,
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <Clock3 className="text-violet-600" />
          <CardTitle>Jornada laboral</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-2">
          <div>
            <Label>Horas por defecto</Label>

            <Input
              type="number"
              value={settings.working_hours}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  working_hours: Number(e.target.value),
                })
              }
            />
          </div>

          <div>
            <Label>Zona horaria</Label>

            <Input
              value={settings.timezone}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  timezone: e.target.value,
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <Palette className="text-violet-600" />
          <CardTitle>Apariencia</CardTitle>
        </CardHeader>

        <CardContent>
          <Label>Color principal</Label>

          <Input
            value={settings.primary_color}
            onChange={(e) =>
              setSettings({
                ...settings,
                primary_color: e.target.value,
              })
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <ShieldCheck className="text-violet-600" />
          <CardTitle>Información</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm text-slate-600">
          <div className="flex justify-between">
            <span>Versión</span>
            <strong>MyClock v1.0</strong>
          </div>

          <div className="flex justify-between">
            <span>Base de datos</span>
            <strong>Supabase</strong>
          </div>

          <div className="flex justify-between">
            <span>Framework</span>
            <strong>Next.js 16</strong>
          </div>

          <div className="flex justify-between">
            <span>Estado</span>
            <span className="font-semibold text-green-600">Operativo</span>
          </div>
        </CardContent>
      </Card>

      {message && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {message}
        </div>
      )}

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={saveSettings}
          disabled={saving}
          size="default"
        >
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </div>
  );
}
