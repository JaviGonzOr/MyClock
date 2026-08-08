import { notFound } from "next/navigation";

import { AdminHeader } from "@/components/admin/admin-header";
import { EmployeeActions } from "@/components/admin/employee-actions";
import { EmployeeEditForm } from "@/components/admin/employee-edit-form";
import { EmployeeHistory } from "@/components/admin/employee-history";
import { EmployeeStats } from "@/components/admin/employee-stats";

import {
  getEmployee,
  getEmployeePunches,
} from "@/services/employee.server";

import { getEmployeeStats } from "@/services/stats.service";

export const dynamic = "force-dynamic";

export default async function EmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const employee = await getEmployee(id);

  if (!employee) {
    notFound();
  }

  const stats = await getEmployeeStats(id);
  const punches = await getEmployeePunches(id);

  return (
    <>
      <AdminHeader
        title={employee.full_name}
        subtitle={employee.email}
      />

      <EmployeeStats
        workedToday={stats.workedToday}
        workedMonth={stats.workedMonth}
        punchesToday={stats.punchesToday}
        lastPunch={stats.lastPunch}
      />

      <div className="px-8">
        <EmployeeActions
          id={employee.id}
          active={employee.active}
        />
      </div>

      <div className="p-8 space-y-8">
        <div className="mx-auto max-w-3xl">
          <EmployeeEditForm employee={employee} />
        </div>

        <div className="mx-auto max-w-3xl">
          <EmployeeHistory
            punches={punches}
            employeeId={employee.id}
          />
        </div>
      </div>
    </>
  );
}