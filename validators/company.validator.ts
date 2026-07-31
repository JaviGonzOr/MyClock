export function validateCompany(data: {
  name: string;
  email: string;
}) {
  const errors: string[] = [];

  if (!data.name.trim()) {
    errors.push("El nombre es obligatorio");
  }

  if (
    data.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      data.email
    )
  ) {
    errors.push("Email incorrecto");
  }

  return errors;
}