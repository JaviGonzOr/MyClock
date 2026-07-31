"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, UserPlus } from "lucide-react";

import { createEmployee } from "@/services/admin-api";
import { useCompanies } from "@/hooks/useCompanies";

export function EmployeeForm() {
  const router = useRouter();

  const { companies } = useCompanies();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: generatePassword(),
    role: "employee",
    company_id: "",
  });

  const [error, setError] = useState("");

  function generatePassword() {
    return Math.random().toString(36).slice(-10) + "A1!";
  }

  function update(field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function save() {
    setError("");

    if (!form.full_name.trim()) {
      setError("Introduce un nombre.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Email incorrecto.");
      return;
    }

    try {
      setLoading(true);

      await createEmployee({
        ...form,
        company_id: form.company_id || null,
      });

      router.push("/admin/employees");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <h2 className="text-3xl font-black text-slate-900">
        Nuevo empleado
      </h2>

      <p className="mt-2 text-slate-500">
        El empleado podrá acceder con la contraseña generada.
      </p>

      <div className="mt-8 space-y-5">

        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            Nombre completo
          </label>

          <input
            value={form.full_name}
            onChange={(e) =>
              update("full_name", e.target.value)
            }
            className="w-full rounded-2xl border border-slate-300 p-3 text-slate-900"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            Email
          </label>

          <input
            value={form.email}
            onChange={(e) =>
              update("email", e.target.value)
            }
            className="w-full rounded-2xl border border-slate-300 p-3 text-slate-900"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            Empresa
          </label>

          <select
            value={form.company_id}
            onChange={(e) =>
              update("company_id", e.target.value)
            }
            className="w-full rounded-2xl border border-slate-300 p-3 text-slate-900"
          >
            <option value="">
              Sin empresa
            </option>

            {companies.map((company) => (
              <option
                key={company.id}
                value={company.id}
              >
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            Contraseña temporal
          </label>

          <input
            value={form.password}
            onChange={(e) =>
              update("password", e.target.value)
            }
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-3 font-mono text-slate-900"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            Rol
          </label>

          <select
            value={form.role}
            onChange={(e) =>
              update("role", e.target.value)
            }
            className="w-full rounded-2xl border border-slate-300 p-3 text-slate-900"
          >
            <option value="employee">
              Empleado
            </option>

            <option value="admin">
              Administrador
            </option>
          </select>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <button
          disabled={loading}
          onClick={save}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-violet-600 py-4 font-bold text-white transition hover:bg-violet-700 disabled:opacity-50"
        >
          {loading ? (
            <Loader2
              size={20}
              className="animate-spin"
            />
          ) : (
            <UserPlus size={20} />
          )}

          Crear empleado
        </button>

      </div>

    </div>
  );
}