import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";
import { EmployeesList } from "@/components/admin/employees-list";

export default function EmployeesPage() {
  return (
    <>

      <AdminHeader
        title="Empleados"
        subtitle="Gestiona todos los empleados"
      />

      <div className="p-8">

        <div className="mb-8 flex justify-end">

          <Link
            href="/admin/employees/new"
            className="rounded-2xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
          >
            <Plus
              className="mr-2 inline"
              size={18}
            />

            Nuevo empleado

          </Link>

        </div>

        <EmployeesList />

      </div>

    </>
  );
}