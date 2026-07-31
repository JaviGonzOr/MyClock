import { AdminHeader } from "@/components/admin/admin-header";
import { EmployeeForm } from "@/components/admin/employee-form";

export default function NewEmployeePage() {
  return (
    <>
      <AdminHeader
        title="Nuevo empleado"
        subtitle="Crear un nuevo empleado"
      />

      <div className="p-8">

        <div className="mx-auto max-w-3xl">

          <EmployeeForm />

        </div>

      </div>
    </>
  );
}