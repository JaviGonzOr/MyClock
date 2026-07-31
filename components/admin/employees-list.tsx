"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { EmployeeCard } from "./employee-card";
import { useEmployees } from "@/hooks/useEmployees";

export function EmployeesList() {
  const {
    employees,
    loading,
  } = useEmployees();

  const [search, setSearch] =
    useState("");

  const filtered =
    useMemo(() => {
      return employees.filter((e) => {
        return (
          e.full_name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          e.email
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
        );
      });
    }, [employees, search]);

  return (
    <>

      <div className="relative mb-8">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Buscar empleado..."
          className="w-full rounded-2xl border border-slate-300 bg-white py-4 pl-12 pr-4 text-slate-900"
        />

      </div>

      {loading ? (

        <div className="text-center py-10 text-slate-500">
          Cargando...
        </div>

      ) : (

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {filtered.map((employee) => (

            <EmployeeCard
              key={employee.id}
              employee={employee}
            />

          ))}

        </div>

      )}

    </>
  );
}