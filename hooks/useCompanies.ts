"use client";

import { useEffect, useState } from "react";
import { companyService } from "@/services/company.service";
import { Company } from "@/types/company";

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);

      const data = await companyService.list();

      setCompanies(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return {
    companies,
    loading,
    refresh: load,
  };
}