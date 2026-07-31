"use client";

import { useEffect, useState } from "react";
import { employeeService } from "@/services/employee.service";
import { Employee } from "@/types/employee";

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);

      const data = await employeeService.list();

      setEmployees(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return {
    employees,
    loading,
    refresh: load,
  };
}