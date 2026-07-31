export interface Company {
  id: string;
  name: string;
  logo_url: string | null;

  address: string | null;
  phone: string | null;
  email: string | null;

  cif?: string | null;
  website?: string | null;

  created_at: string;
}