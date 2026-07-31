import { AdminHeader } from "@/components/admin/admin-header";

export default async function EditEmployeePage() {
  return (
    <>
      <AdminHeader
        title="Editar empleado"
        subtitle="Modificar información"
      />

      <div className="p-8">

        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <p className="text-slate-600">
            En el siguiente paso conectaremos este formulario
            con la base de datos.
          </p>

        </div>

      </div>
    </>
  );
}