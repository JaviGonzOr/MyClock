import { companyRepository } from "@/repositories/company.repository";
import { Company } from "@/types/company";

export class CompanyService {
  list() {
    return companyRepository.all();
  }

  load(id: string) {
    return companyRepository.find(id);
  }

  async save(data: Partial<Company>) {
    console.log("CompanyService.save() recibido:", data);

    if (data.id) {
      console.log("➡ UPDATE", data.id);

      await companyRepository.update(
        data as Company & { id: string }
      );

      console.log("✅ UPDATE terminado");

      return;
    }

    console.log("➡ CREATE");

    const company = await companyRepository.create({
      name: data.name ?? "",
      cif: data.cif ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      address: data.address ?? "",
      website: data.website ?? "",
      logo_url: data.logo_url ?? "",
    });

    console.log("✅ CREATE terminado:", company);
  }
}

export const companyService = new CompanyService();