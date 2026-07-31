export async function createEmployee(data: {
  full_name: string;
  email: string;
  password: string;
  role?: string;
  company_id?: string | null;
}) {
  const response = await fetch(
    "/api/admin/employees",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error);
  }

  return json;
}