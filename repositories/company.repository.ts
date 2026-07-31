import { BaseRepository } from "./base.repository";
import { Company } from "@/types/company";

class CompanyRepository extends BaseRepository {
  async all(): Promise<Company[]> {
    const { data, error } = await this.db
      .from("companies")
      .select("*")
      .order("name");

    if (error) throw error;

    return (data ?? []) as Company[];
  }

  async find(id: string): Promise<Company | null> {
    const { data, error } = await this.db
      .from("companies")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;

    return data as Company | null;
  }

  async create(company: Omit<Company, "id" | "created_at">): Promise<Company> {
    const { data, error } = await this.db
      .from("companies")
      .insert(company)
      .select()
      .single();

    console.log("CREATE RESULT:", data);

    if (error) throw error;

    return data as Company;
  }

  async update(company: Partial<Company> & { id: string }): Promise<void> {
    const { data, error, status, statusText, count } = await this.db
      .from("companies")
      .update({
        name: company.name,
        cif: company.cif,
        email: company.email,
        phone: company.phone,
        address: company.address,
        website: company.website,
        logo_url: company.logo_url,
      })
      .eq("id", company.id)
      .select();

    console.log("STATUS:", status);
    console.log("STATUS TEXT:", statusText);
    console.log("COUNT:", count);
    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) throw error;
  }
  async delete(id: string): Promise<void> {
    const { error } = await this.db.from("companies").delete().eq("id", id);

    if (error) throw error;
  }
}

export const companyRepository = new CompanyRepository();
