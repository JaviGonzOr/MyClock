"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import CompanyLogoUpload from "@/components/admin/company-logo-upload";
import { companyService } from "@/services/company.service";
import { Company } from "@/types/company";

export default function CompanyPage() {
  const [company, setCompany] = useState<Partial<Company>>({
    name: "",
    cif: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    logo_url: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCompany();
  }, []);

  async function loadCompany() {
    try {
      const companies = await companyService.list();

      console.log("Empresas cargadas:", companies);

      if (companies.length > 0) {
        setCompany(companies[0]);
      } else {
        setCompany({
          name: "",
          cif: "",
          email: "",
          phone: "",
          address: "",
          website: "",
          logo_url: "",
        });
      }
    } catch (error) {
      console.error(error);
      alert("No se pudo cargar la empresa.");
    } finally {
      setLoading(false);
    }
  }

  function updateField<K extends keyof Company>(
    field: K,
    value: Company[K]
  ) {
    setCompany((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function save() {
    console.log("Empresa antes de guardar:", company);

    try {
      setSaving(true);

      const data = {
        ...company,
        name: company.name ?? "",
        cif: company.cif ?? "",
        email: company.email ?? "",
        phone: company.phone ?? "",
        address: company.address ?? "",
        website: company.website ?? "",
        logo_url: company.logo_url ?? "",
      };

      console.log("Datos enviados al servicio:", data);

      await companyService.save(data);

      console.log("Guardado correctamente");

      alert("Empresa guardada correctamente.");

      await loadCompany();
    } catch (error: any) {
      console.error("ERROR COMPLETO:", error);
      console.error("Mensaje:", error?.message);
      console.error("Code:", error?.code);
      console.error("Details:", error?.details);
      console.error("Hint:", error?.hint);

      alert(error?.message ?? "No se pudo guardar la empresa.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <>
        <AdminHeader
          title="Empresa"
          subtitle="Configuración general de la empresa"
        />
        <div className="p-8 text-slate-900">Cargando...</div>
      </>
    );
  }

  return (
    <>
      <AdminHeader
        title="Empresa"
        subtitle="Configuración general de la empresa"
      />

      <div className="p-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-black text-slate-900">
            Información de la empresa
          </h2>

          <p className="mt-2 text-slate-600">
            Estos datos aparecerán en informes y documentos.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div>
              <CompanyLogoUpload
                value={company.logo_url ?? ""}
                onChange={(url) => updateField("logo_url", url)}
              />

              <label className="mb-2 mt-6 block font-semibold text-slate-900">
                Nombre
              </label>

              <input
                type="text"
                className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-slate-900"
                value={company.name ?? ""}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-slate-900">
                CIF
              </label>

              <input
                type="text"
                className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-slate-900"
                value={company.cif ?? ""}
                onChange={(e) => updateField("cif", e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-slate-900">
                Email
              </label>

              <input
                type="email"
                className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-slate-900"
                value={company.email ?? ""}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-slate-900">
                Teléfono
              </label>

              <input
                type="text"
                className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-slate-900"
                value={company.phone ?? ""}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block font-semibold text-slate-900">
                Dirección
              </label>

              <input
                type="text"
                className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-slate-900"
                value={company.address ?? ""}
                onChange={(e) => updateField("address", e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block font-semibold text-slate-900">
                Página web
              </label>

              <input
                type="text"
                className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-slate-900"
                value={company.website ?? ""}
                onChange={(e) => updateField("website", e.target.value)}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="mt-8 rounded-2xl bg-violet-600 px-8 py-3 font-semibold text-white"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </div>
    </>
  );
}